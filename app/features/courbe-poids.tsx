"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Fonction pour générer des données aléatoires entre 40 et 120 kg
const generateData = (days: number) => {
  const data = [];
  let weight = Math.random() * (120 - 40) + 40; // Poids initial aléatoire entre 40 et 120 kg
  for (let i = 0; i < days; i++) {
    weight += Math.random() * 2 - 1; // Variation plus importante : -1 à +1 kg
    weight = Math.max(40, Math.min(120, weight)); // Assure que le poids reste entre 40 et 120 kg
    data.push({
      jour: `Jour ${i + 1}`,
      poids: parseFloat(weight.toFixed(1)),
    });
  }
  return data;
};

const data = generateData(90); // 90 jours de données

export default function CourbePoids() {
  const [period, setPeriod] = useState("30");
  const filteredData = data.slice(-parseInt(period));

  const startWeight = filteredData[0].poids;
  const endWeight = filteredData[filteredData.length - 1].poids;
  const weightChange = endWeight - startWeight;
  const averageWeight =
    filteredData.reduce((sum, day) => sum + day.poids, 0) / filteredData.length;

  return (
    <Card className="w-full max-w-4xl bg-gradient-to-br from-secondary to-accent">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary">
          Suivi de Poids (40-120 kg)
        </CardTitle>
        <CardDescription className="text-lg text-primary-foreground">
          Visualisez votre progression sur une large échelle
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-between items-center">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionnez une période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 jours</SelectItem>
              <SelectItem value="30">30 jours</SelectItem>
              <SelectItem value="90">90 jours</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">
              Poids moyen: {averageWeight.toFixed(1)} kg
            </p>
            <p
              className={`text-sm font-medium ${
                weightChange >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {weightChange >= 0 ? "+" : ""}
              {weightChange.toFixed(1)} kg
            </p>
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer>
            <LineChart
              data={filteredData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorPoids" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--muted-foreground))"
              />
              <XAxis dataKey="jour" stroke="hsl(var(--muted-foreground))" />
              <YAxis domain={[40, 120]} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderRadius: "var(--radius)",
                  border: "1px solid hsl(var(--border))",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend />
              <ReferenceLine
                y={averageWeight}
                label="Moyenne"
                stroke="hsl(var(--secondary))"
                strokeDasharray="3 3"
              />
              <Line
                type="monotone"
                dataKey="poids"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ stroke: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 8 }}
                name="Poids"
                fillOpacity={1}
                fill="url(#colorPoids)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
