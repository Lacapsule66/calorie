import prisma from "@/lib/prisma"; // Modifiez le chemin si nécessaire pour correspondre à votre instance Prisma
import { NextRequest, NextResponse } from "next/server";
export type WeightTrackingData = {
  id: string;
  date: string;
  weight: number;
};
export async function POST(
  req: NextRequest,
  { params }: { params: { userprofileid: string } }
) {
  try {
    const userId = params.userprofileid;

    if (!userId) {
      return NextResponse.json({ error: "userId manquant" }, { status: 400 });
    }

    const { weight } = await req.json();
    console.log(weight);
    if (weight === undefined || typeof weight !== "number") {
      return NextResponse.json(
        { error: "Le poids est manquant ou non valide" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur introuvable pour cet ID" },
        { status: 404 }
      );
    }

    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);

    const newEntry = await prisma.weightTracking.create({
      data: { userId, date, weight },
    });

    return NextResponse.json(newEntry);
  } catch (error: any) {
    // Typage explicite de `error` en `any`
    if (error.code === "P2002") {
      // Code pour violation de contrainte unique
      return NextResponse.json(
        {
          error:
            "Un enregistrement de poids existe déjà pour aujourd'hui. Veuillez le mettre à jour.",
        },
        { status: 409 } // 409 Conflict
      );
    }

    console.error("Erreur lors de la mise à jour du poids :", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du poids" },
      { status: 500 }
    );
  }
}
export async function GET(
  request: Request,
  { params }: { params: { userprofileid: string } }
) {
  try {
    const userId = params.userprofileid;

    // Récupère les entrées WeightTracking pour le userProfileId spécifié
    const weightEntries = await prisma.weightTracking.findMany({
      where: { userId },
      orderBy: { date: "asc" }, // Trie par date croissante pour l'affichage chronologique
    });

    return NextResponse.json(weightEntries, { status: 200 });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des entrées WeightTracking:",
      error
    );
    return NextResponse.json(
      { error: "Échec de la récupération des entrées" },
      { status: 500 }
    );
  }
}
