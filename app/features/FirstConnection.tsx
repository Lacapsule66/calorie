"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Smile } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FirstConnection({
  session,
}: {
  session: Session | null;
}) {
  const [step, setStep] = useState(1);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(30);
  const [frequency, setFrequency] = useState("");
  const [goal, setGoal] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleNext = () => {
    setError("");
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (frequency) {
        setStep(3);
      } else {
        setError("Veuillez sélectionner une fréquence sportive.");
      }
    } else if (step === 3) {
      if (goal) {
        setStep(4);
      } else {
        setError("Veuillez sélectionner un objectif.");
      }
    }
  };

  const handleSubmit = async () => {
    console.log({ weight, height, age, frequency, goal });
    try {
      const response = await fetch("/api/userprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weight,
          height,
          age,
          frequency,
          goal,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Profil créé avec succès :", result.data);
        setStep(4); // Passe à l'étape de confirmation
        router.push("/");
      } else {
        console.error("Erreur lors de la création du profil :", result.message);
        setError(
          result.message ||
            "Une erreur est survenue lors de la création du profil"
        );
      }
    } catch (error) {
      console.error("Erreur réseau ou autre :", error);
      setError("Une erreur réseau est survenue. Veuillez réessayer plus tard.");
    }
  };
  const handleReset = () => {
    setStep(1);
    setWeight(70);
    setHeight(170);
    setAge(30);
    setFrequency("");
    setGoal("");
    setError("");
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-background">
      {step === 1 && (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Informations physiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="weight">Poids (kg): {weight}</Label>
                <Slider
                  id="weight"
                  min={40}
                  max={150}
                  step={1}
                  value={[weight]}
                  onValueChange={(value) => setWeight(value[0])}
                />
              </div>
              <div>
                <Label htmlFor="height">Taille (cm): {height}</Label>
                <Slider
                  id="height"
                  min={140}
                  max={220}
                  step={1}
                  value={[height]}
                  onValueChange={(value) => setHeight(value[0])}
                />
              </div>
              <div>
                <Label htmlFor="age">Âge: {age}</Label>
                <Slider
                  id="age"
                  min={18}
                  max={100}
                  step={1}
                  value={[age]}
                  onValueChange={(value) => setAge(value[0])}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleNext}>Suivant</Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Fréquence sportive</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup onValueChange={setFrequency} value={frequency}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="r1" />
                <Label htmlFor="r1">Jamais</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1-2" id="r2" />
                <Label htmlFor="r2">1-2 fois par semaine</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3-4" id="r3" />
                <Label htmlFor="r3">3-4 fois par semaine</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5+" id="r4" />
                <Label htmlFor="r4">5+ fois par semaine</Label>
              </div>
            </RadioGroup>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleNext}>Suivant</Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Objectif</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup onValueChange={setGoal} value={goal}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="perte-poids" id="g1" />
                <Label htmlFor="g1">Perte de poids</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="prise-masse" id="g2" />
                <Label htmlFor="g2">Prise de masse</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="maintien" id="g3" />
                <Label htmlFor="g3">Maintien de la forme</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="performance" id="g4" />
                <Label htmlFor="g4">Amélioration des performances</Label>
              </div>
            </RadioGroup>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit}>Terminer</Button>
          </CardFooter>
        </Card>
      )}

      {step === 4 && (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Confirmation</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Smile className="size-16 mx-auto text-green-500 mb-4" />
            <p className="text-lg font-semibold mb-4">
              Vos données ont été enregistrées avec succès !
            </p>
            <p>Poids : {weight} kg</p>
            <p>Taille : {height} cm</p>
            <p>Âge : {age} ans</p>
            <p>Fréquence sportive : {frequency} fois par semaine</p>
            <p>Objectif : {goal}</p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button onClick={handleReset}>Recommencer</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
