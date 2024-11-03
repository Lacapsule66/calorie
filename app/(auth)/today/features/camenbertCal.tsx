"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type UserAliment = {
  aliment: string;
  id: string;
  calories: number;
  glucides: number;
  lipides: number;
  proteines: number;
  userId: string;
  createdAt: Date;
};

const SAMPLE: UserAliment[] = [
  {
    aliment: "Pomme",
    id: "1",
    calories: 95,
    glucides: 25,
    lipides: 0.3,
    proteines: 0.5,
    userId: "user1",
    createdAt: new Date(),
  },
  {
    aliment: "Poulet grillé",
    id: "2",
    calories: 165,
    glucides: 0,
    lipides: 3.6,
    proteines: 31,
    userId: "user1",
    createdAt: new Date(),
  },
  {
    aliment: "Riz brun",
    id: "3",
    calories: 216,
    glucides: 45,
    lipides: 1.6,
    proteines: 5,
    userId: "user1",
    createdAt: new Date(),
  },
];

interface CaloriePieChartProps {
  userAliments?: UserAliment[];
  totalDailyCalories?: number;
}

export default function CalorieChart({
  userAliments = SAMPLE,
  totalDailyCalories = 2000,
}: CaloriePieChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const caloriesConsumed = userAliments.reduce(
    (sum, aliment) => sum + aliment.calories,
    0
  );
  const remainingCalories = Math.max(totalDailyCalories - caloriesConsumed, 0);
  const percentageConsumed = Math.min(
    (caloriesConsumed / totalDailyCalories) * 100,
    100
  );

  const data = [
    { name: "Calories consommées", value: caloriesConsumed },
    { name: "Calories restantes", value: remainingCalories },
  ];

  if (!mounted) {
    return null; // ou un composant de chargement
  }
  function sendMessageToApp(window: any) {
    window.ReactNativeWebView.postMessage("Hello from the WebView!");
  }
  return (
    <Card className="w-full max-w-md">
      <Button onClick={sendMessageToApp}></Button>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Suivi des Calories
        </CardTitle>
        <CardDescription className="text-center">
          Votre consommation journalière
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full relative mb-6">
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
                startAngle={90}
                endAngle={450}
              >
                <Cell key="cell-0" fill="hsl(var(--primary))" />
                <Cell key="cell-1" fill="hsl(var(--muted))" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-5xl font-bold text-primary">
              {caloriesConsumed}
            </p>
            <p className="text-sm text-muted-foreground">calories consommées</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Progression</span>
            <span className="text-sm text-muted-foreground">
              {percentageConsumed.toFixed(1)}%
            </span>
          </div>
          <Progress value={percentageConsumed} className="h-2" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-2xl font-bold text-primary">
              {remainingCalories}
            </p>
            <p className="text-sm text-primary-foreground">
              Calories restantes
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-2xl font-bold">{totalDailyCalories}</p>
            <p className="text-sm text-muted-foreground">Objectif journalier</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
