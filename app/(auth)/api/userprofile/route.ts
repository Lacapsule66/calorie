// app/api/userProfile/route.ts

import prisma from "@/lib/prisma"; // Ajuste le chemin selon l'emplacement de ton instance Prisma
import { NextResponse } from "next/server";
import { auth } from "../../auth";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Utilisateur non authentifié" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { weight, height, age, frequency, goal } = body;

    const newUserProfile = await prisma.userProfile.create({
      data: {
        weight,
        height,
        age,
        sportFrequency: frequency,
        objectif: goal,
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      { success: true, data: newUserProfile },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du profil utilisateur :", error);
    return NextResponse.json(
      {
        success: false,
        message: "Échec de la création du profil utilisateur",
        error,
      },
      { status: 500 }
    );
  }
}
