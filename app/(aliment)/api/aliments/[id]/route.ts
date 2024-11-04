import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Parse the JSON body of the request to get the new quantity
    const body = await request.json();
    const { quantite } = body;

    if (typeof quantite !== "number") {
      return NextResponse.json({ error: "Quantité invalide" }, { status: 400 });
    }

    // Update the quantity of the specified aliment in the database
    const updatedAliment = await prisma.aliment.update({
      where: { id },
      data: { quantite },
    });

    return NextResponse.json(updatedAliment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la quantité" },
      { status: 500 }
    );
  }
}
