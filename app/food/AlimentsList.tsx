"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface Aliment {
  aliment: string;
  id: string;
  calories: number;
  glucides: number;
  lipides: number;
  proteines: number;
  userId: string;
  createdAt: Date;
}

interface AlimentsTableProps {
  aliments: Aliment[];
  onCalculateTotals: (totals: {
    lipides: number;
    glucides: number;
    proteines: number;
  }) => void;
}

export function AlimentsTable({
  aliments,
  onCalculateTotals,
}: AlimentsTableProps) {
  // Calcul des totaux des macronutriments
  const totals = aliments.reduce(
    (acc, item) => {
      acc.lipides += item.lipides;
      acc.glucides += item.glucides;
      acc.proteines += item.proteines;
      return acc;
    },
    { lipides: 0, glucides: 0, proteines: 0 }
  );

  // Transmettre les totaux au parent
  onCalculateTotals(totals);

  // Etat pour la modal
  const [selectedAliment, setSelectedAliment] = useState<Aliment | null>(null);

  // Gestion de l'ouverture de la modal
  const openModal = (aliment: Aliment) => setSelectedAliment(aliment);
  const closeModal = () => setSelectedAliment(null);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {aliments.map((aliment) => (
          <Card
            key={aliment.id}
            className="w-full cursor-pointer"
            onClick={() => openModal(aliment)}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-center">
                {aliment.aliment}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <span>Calories :</span>
                <span>{aliment.calories} kcal</span>
              </div>
              {/* Affichage des détails uniquement pour les écrans moyens et plus */}
              <div className="hidden sm:block">
                <div className="flex justify-between">
                  <Badge variant="outline" className="bg-primary text-white">
                    Lipides
                  </Badge>
                  <span>{aliment.lipides}g</span>
                </div>
                <div className="flex justify-between">
                  <Badge variant="outline" className="bg-secondary text-white">
                    Glucides
                  </Badge>
                  <span>{aliment.glucides}g</span>
                </div>
                <div className="flex justify-between">
                  <Badge variant="outline" className="bg-accent text-white">
                    Protéines
                  </Badge>
                  <span>{aliment.proteines}g</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {selectedAliment && (
        <Dialog open={!!selectedAliment} onOpenChange={closeModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedAliment.aliment}</DialogTitle>
            </DialogHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span>Calories :</span>
                  <span>{selectedAliment.calories} kcal</span>
                </div>
                <div className="flex justify-between">
                  <Badge variant="outline" className="bg-primary text-white">
                    Lipides xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  </Badge>
                  <span>{selectedAliment.lipides}g</span>
                </div>
                <div className="flex justify-between">
                  <Badge variant="outline" className="bg-secondary text-white">
                    Glucides
                  </Badge>
                  <span>{selectedAliment.glucides}g</span>
                </div>
                <div className="flex justify-between">
                  <Badge variant="outline" className="bg-accent text-white">
                    Protéines
                  </Badge>
                  <span>{selectedAliment.proteines}g</span>
                </div>
              </div>
              <Button onClick={closeModal} className="mt-4">
                Fermer
              </Button>
            </CardContent>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
