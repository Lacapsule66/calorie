"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormulaireWeigthProps {
  userID: string;
}

export default function FormulaireWeigth({ userID }: FormulaireWeigthProps) {
  const [weight, setWeight] = useState(70); // Poids par défaut
  const router = useRouter();
  // Gérer le changement du Slider
  const handleSliderChange = (value: number[]) => {
    setWeight(value[0]);
  };

  // Gérer le changement de l'input manuel
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 30 && value <= 300) {
      setWeight(value);
    }
  };

  const handleValidate = async () => {
    try {
      console.log(weight, userID);
      const response = await fetch("/api/user/updateweight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userID,
          weight: weight, // Passer le poids actuel
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Erreur lors de la mise à jour du poids :",
          errorData.error
        );
        return;
      }

      const data = await response.json();
      console.log("Poids mis à jour avec succès :", data);
      router.push("/chatbot");
      // Redirection ou action après la mise à jour réussie
    } catch (error) {
      console.error("Erreur lors de la validation :", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Quelle est votre poids ?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="weight-slider" className="text-sm font-medium">
              Ajustez le curseur pour indiquer votre poids
            </Label>
            <Slider
              id="weight-slider"
              min={30}
              max={300}
              step={1}
              value={[weight]} // Utilise la valeur du poids dans le slider
              onValueChange={handleSliderChange} // Gère le changement de valeur du slider
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight-input" className="text-sm font-medium">
              Ou entrez votre poids précis (en kg)
            </Label>
            <Input
              id="weight-input"
              type="number"
              min={30}
              max={300}
              value={weight}
              onChange={handleInputChange} // Gère le changement de l'input manuel
              className="w-full"
            />
          </div>
          <div className="text-center text-2xl font-bold text-primary">
            Votre poids : {weight} kg
          </div>
          <Button onClick={handleValidate}>Valider</Button>
        </CardContent>
      </Card>
    </div>
  );
}
