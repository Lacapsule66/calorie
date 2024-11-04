"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface Aliment {
  id: string;
  aliment: string;
  calories: number;
  glucides: number;
  lipides: number;
  proteines: number;
  userId: string;
  quantite: number | null;
  createdAt: Date;
}

interface AlimentsTableProps {
  aliments: Aliment[];
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function AlimentsTable({ aliments }: AlimentsTableProps) {
  const [alimentsState, setAlimentsState] = useState(aliments);
  const [selectedAlimentId, setSelectedAlimentId] = useState<string | null>(
    null
  );
  const [newQuantite, setNewQuantite] = useState<number | null>(null);

  const handleQuantiteClick = (
    alimentId: string,
    currentQuantite: number | null
  ) => {
    setSelectedAlimentId(alimentId);
    setNewQuantite(currentQuantite || 0);
  };

  const updateQuantite = async (alimentId: string) => {
    if (newQuantite === null) return;

    try {
      const response = await fetch(`/api/aliments/${alimentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantite: newQuantite }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la quantité");
      }

      const updatedAliment = await response.json();

      // Mettre à jour l'état local des aliments avec les nouvelles valeurs
      setAlimentsState((prevAliments) =>
        prevAliments.map((aliment) =>
          aliment.id === alimentId
            ? {
                ...aliment,
                quantite: updatedAliment.quantite,
                calories: updatedAliment.calories,
                proteines: updatedAliment.proteines,
                glucides: updatedAliment.glucides,
                lipides: updatedAliment.lipides,
              }
            : aliment
        )
      );

      setSelectedAlimentId(null); // Réinitialise la sélection après la mise à jour
      setNewQuantite(null); // Réinitialise la nouvelle quantité
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tableau des aliments</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Aliment</TableHead>
            <TableHead className="text-right">Quantité</TableHead>
            <TableHead className="text-right">Calories</TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Protéines
            </TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Glucides
            </TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Lipides
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alimentsState.map((aliment) => (
            <TableRow key={aliment.id}>
              <TableCell>{truncateText(aliment.aliment, 20)}</TableCell>
              <TableCell className="text-right">
                {selectedAlimentId === aliment.id ? (
                  <div className="flex items-center justify-end gap-2">
                    <input
                      type="number"
                      value={newQuantite || 0}
                      onChange={(e) => setNewQuantite(Number(e.target.value))}
                      className="border p-1 w-16 text-right"
                    />
                    <Button onClick={() => updateQuantite(aliment.id)}>
                      Mettre à jour
                    </Button>
                  </div>
                ) : (
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      handleQuantiteClick(aliment.id, aliment.quantite)
                    }
                  >
                    {aliment.quantite}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">
                {(aliment.calories || 0).toFixed(2)}
              </TableCell>
              <TableCell className="hidden md:table-cell text-right">
                {(aliment.proteines || 0).toFixed(2)}g
              </TableCell>
              <TableCell className="hidden md:table-cell text-right">
                {(aliment.glucides || 0).toFixed(2)}g
              </TableCell>
              <TableCell className="hidden md:table-cell text-right">
                {(aliment.lipides || 0).toFixed(2)}g
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
