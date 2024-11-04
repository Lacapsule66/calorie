import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export type WeightTrackingData = {
  id: string;
  date: string;
  weight: number;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { userprofileid: string } }
) {
  try {
    const userProfileId = params.userprofileid;
    const weightTracking = await prisma.weightTracking.findMany({
      where: { userProfileId },
      orderBy: { date: "asc" },
    });
    return NextResponse.json(weightTracking);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données de poids" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { userprofileid: string } }
) {
  try {
    const userProfileId = params.userprofileid;

    if (!userProfileId) {
      return NextResponse.json(
        { error: "userProfileId manquant" },
        { status: 400 }
      );
    }

    const { weight } = await req.json();

    if (weight === undefined || typeof weight !== "number") {
      return NextResponse.json(
        { error: "Le poids est manquant ou non valide" },
        { status: 400 }
      );
    }

    // Utiliser une instance de Date
    const date = new Date();
    console.log("Date actuelle:", date);

    const newEntry = await prisma.weightTracking.upsert({
      where: { userProfileId_date: { userProfileId, date } },
      update: { weight },
      create: { userProfileId, date, weight },
    });

    console.log("Nouvel enregistrement créé:", newEntry);

    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Erreur lors du POST :", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du poids" },
      { status: 500 }
    );
  }
}
