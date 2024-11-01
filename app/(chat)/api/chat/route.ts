import { convertToCoreMessages, Message, streamText } from "ai";
import { z } from "zod";

import { geminiProModel } from "@/ai";
import { auth } from "@/app/(auth)/auth";
import { deleteChatById, getChatById, saveChat } from "@/db/queries";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { id, messages }: { id: string; messages: Array<Message> } =
    await request.json();

  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const coreMessages = convertToCoreMessages(messages).filter(
    (message) => message.content.length > 0
  );

  const result = await streamText({
    model: geminiProModel,

    system: `
  **Vous êtes un assistant virtuel pour le comptage de calories des aliments consommés par l’utilisateur.**

- **Utilisation des outils** : Lors de l'utilisation d'un outil, ne fournissez aucune réponse ou commentaire supplémentaire en dehors de la réponse spécifiée par l'outil.
  
- **Structure de réponse** : 
  - Utilisez l'outil 'listAliments' pour structurer la liste des aliments fournis par l’utilisateur.
  - Si l’utilisateur mentionne plusieurs fois le même aliment, ajustez la quantité dans 'listAliments' en fonction du nombre de fois que cet aliment a été consommé.

- **Gestion des quantités** :
  - Si l’aliment est exprimé avec une quantité claire (ex. : "3 biscuits au chocolat"), ne posez pas de questions.
  - Si l’aliment est exprimé de manière ambiguë (ex. : "1 sachet de biscuits"), demandez la quantité exacte. Exemple de question : "Combien de biscuits y avait-il dans le sachet ?"

- **Calcul des calories** : 
  - À partir de vos propres connaissances, déterminez le nombre de calories moyen pour chaque aliment, et non pas pour 100g.
  - Ne fournissez les informations caloriques qu'une fois que l’utilisateur a terminé d'énumérer tous les aliments consommés.

- **Confirmation des aliments consommés** :
  - Après avoir retourné la liste des aliments à l’utilisateur,demande s’il a mangé autre chose.
  - Si l’utilisateur répond "oui", demandez-lui de préciser les autres aliments consommés.
  -- Quand tu reçois la réponse des nouveaux aliments consommé reprend l'ancien tableau est met le a jour avec les nouveau aliments
  - Si l’utilisateur répond "non", invitez-le à consulter la page de suivi pour voir sa consommation du jour.


    `,

    messages: coreMessages,

    tools: {
      closeDialog: {
        description:
          "envoi un lien a l'user pour le redirigé vers la page suivi calorique",
        parameters: z.object({
          choice: z.boolean(),
        }),
        execute: async (choice) => {
          return choice;
        },
      },

      removeAliment: {
        parameters: z.object({
          alimentId: z.string(), // L'ID de l'aliment à supprimer
        }),
        execute: async ({ alimentId }) => {
          try {
            // Suppression de l'aliment en utilisant l'ID unique
            await prisma.aliment.delete({
              where: {
                id: alimentId,
              },
            });

            console.log(`L'aliment avec l'ID "${alimentId}" a été supprimé.`);
            return `L'aliment a été supprimé de votre journal.`;
          } catch (error) {
            console.error(
              "Erreur lors de la suppression de l'aliment :",
              error
            );
            throw new Error(
              "Impossible de supprimer l'aliment, veuillez vérifier les données et réessayer."
            );
          }
        },
      },
      listAliments: {
        parameters: z.object({
          alimentsList: z.array(
            z.object({
              aliment: z.string(),
              calorie: z.number(),
              glucides: z.number(),
              lipides: z.number(),
              proteines: z.number(),
            })
          ),
        }),
        execute: async ({ alimentsList }) => {
          const now = new Date();
          const franceOffset = now.getTimezoneOffset() === -60 ? 1 : 1;
          const currentDateTime = new Date(
            now.setHours(now.getHours() + franceOffset)
          );

          const alimentsWithIds = []; // Tableau pour stocker les aliments avec leur ID

          try {
            for (const item of alimentsList) {
              // Ajouter chaque aliment et récupérer son ID
              const aliment = await prisma.aliment.create({
                data: {
                  aliment: item.aliment,
                  calories: item.calorie,
                  glucides: item.glucides,
                  lipides: item.lipides,
                  proteines: item.proteines,
                  userId: session.user?.id || "",
                  createdAt: currentDateTime,
                },
              });

              // Ajouter l'élément avec ID dans le tableau de réponse
              alimentsWithIds.push({
                ...item,
                id: aliment.id, // Inclure l'ID généré
              });
            }

            console.log("Tous les aliments ont été ajoutés avec succès.");
          } catch (error) {
            console.error("Erreur lors de l'ajout des aliments :", error);
            throw new Error(
              "Impossible d'ajouter les aliments, veuillez vérifier les données et réessayer."
            );
          }

          return alimentsWithIds; // Retourne la liste des aliments avec leurs IDs
        },
      },
    },
    onFinish: async ({ responseMessages }) => {
      if (session.user && session.user.id) {
        try {
          await saveChat({
            id,
            messages: [...coreMessages, ...responseMessages],
            userId: session.user.id,
          });
        } catch (error) {
          console.error("Failed to save chat");
        }
      }
    },
    experimental_telemetry: {
      isEnabled: true,
      functionId: "stream-text",
    },
  });
  return result.toDataStreamResponse({});
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await deleteChatById({ id });

    return new Response("Chat deleted", { status: 200 });
  } catch (error) {
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}
