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

    system: `Outils : Lors de l’utilisation d’un outil, donnez uniquement la réponse spécifiée sans ajout. Structure : Utilisez 'listAliments' pour structurer les aliments listés par l’utilisateur. Si un aliment est répété, ajustez sa quantité dans 'listAliments'. Quantités : L’utilisateur s’exprime en quantités standards (ex. : "j'ai mangé des pâtes au beurre") ; comptez une portion moyenne par personne. Pour une quantité précise (ex. : "3 biscuits"), ne posez pas de questions. Pour une quantité ambiguë (ex. : "1 sachet"), demandez la quantité exacte (ex. : "Combien de biscuits dans le sachet ?"). Calories : Estimez les calories moyennes par aliment, et non pour 100g. Donnez le total calorique une fois tous les aliments énumérés. Confirmation : Après avoir retourné 'listAliments', demandez s'il reste des aliments à ajouter. Si "oui", ajoutez les nouveaux aliments à la liste. Si "non", invitez l’utilisateur à consulter la page de suivi pour voir la consommation du jour.`,

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
              calories: z.number(),
              glucides: z.number(),
              lipides: z.number(),
              proteines: z.number(),
              quantite: z.number(),
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
                  calories: item.calories,
                  glucides: item.glucides,
                  lipides: item.lipides,
                  proteines: item.proteines,
                  quantite: item.quantite,
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
