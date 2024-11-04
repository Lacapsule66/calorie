"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface Aliment {
  aliment: string;
  id: string;
  calories: number;
  glucides: number;
  lipides: number;
  proteines: number;
  userId: string;
  quantite: number | null;
  createdAt: Date;
}

interface CompteurMacroProps {
  userAliments: Aliment[];
}

// Composant CompteurMacro
export function CompteurMacro({ userAliments }: CompteurMacroProps) {
  const { lipides, glucides, proteines, total } = useMemo(() => {
    const lipides = userAliments.reduce(
      (acc, item) => acc + item.lipides * (item.quantite || 1),
      0
    );
    const glucides = userAliments.reduce(
      (acc, item) => acc + item.glucides * (item.quantite || 1),
      0
    );
    const proteines = userAliments.reduce(
      (acc, item) => acc + item.proteines * (item.quantite || 1),
      0
    );
    const total = lipides + glucides + proteines;
    return { lipides, glucides, proteines, total };
  }, [userAliments]);

  const data = [
    { name: "Lipides", value: lipides, color: "hsl(var(--primary))" },
    { name: "Glucides", value: glucides, color: "hsl(220, 90%, 60%)" },
    { name: "Protéines", value: proteines, color: "hsl(40, 85%, 50%)" },
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

// Composant parent
export default function Dashboard({
  userAliments,
}: {
  userAliments: Aliment[];
}) {
  return (
    <div>
      <CompteurMacro userAliments={userAliments} />
    </div>
  );
}
