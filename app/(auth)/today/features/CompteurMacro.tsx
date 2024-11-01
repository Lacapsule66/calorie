"use client";

import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MacronutrientChartProps {
  lipides: number;
  glucides: number;
  proteines: number;
}

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

// Composant CompteurMacro
export function CompteurMacro({
  lipides = 0,
  glucides = 0,
  proteines = 0,
}: MacronutrientChartProps) {
  const total = lipides + glucides + proteines;
  const data = [
    { name: "Lipides", value: lipides, color: "hsl(var(--primary))" },
    { name: "Glucides", value: glucides, color: "hsl(var(--secondary))" },
    { name: "Protéines", value: proteines, color: "hsl(var(--accent))" },
  ];

  const getPercentage = (value: number) =>
    total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Répartition des Macronutriments
        </CardTitle>
        <CardDescription className="text-center">
          Votre consommation journalière
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] relative mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-4xl font-bold">{total}g</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <Badge
                variant="outline"
                style={{ backgroundColor: item.color, color: "white" }}
              >
                {item.name}
              </Badge>
              <p className="mt-2 text-2xl font-bold">{item.value}g</p>
              <p
                className={`text-sm text-muted-foreground ${
                  total > 0 ? "block" : "hidden"
                }`}
              >
                {getPercentage(item.value)}%
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Composant AlimentsTable
export function AlimentsTable({
  aliments,
  onCalculateTotals,
}: AlimentsTableProps) {
  const totals = useMemo(() => {
    const lipides = aliments.reduce((acc, item) => acc + item.lipides, 0);
    const glucides = aliments.reduce((acc, item) => acc + item.glucides, 0);
    const proteines = aliments.reduce((acc, item) => acc + item.proteines, 0);
    return { lipides, glucides, proteines };
  }, [aliments]);

  // Appel de la fonction pour envoyer les totaux vers le composant parent
  onCalculateTotals(totals);

  return (
    <div>
      {/* Logique d'affichage du tableau des aliments */}
      {/* Map sur aliments pour afficher les données ici */}
    </div>
  );
}

// Composant parent
export default function Dashboard({
  userAliments,
}: {
  userAliments: Aliment[];
}) {
  const [totals, setTotals] = useState({
    lipides: 0,
    glucides: 0,
    proteines: 0,
  });

  return (
    <div>
      <CompteurMacro
        lipides={totals.lipides}
        glucides={totals.glucides}
        proteines={totals.proteines}
      />
      <AlimentsTable aliments={userAliments} onCalculateTotals={setTotals} />
    </div>
  );
}
