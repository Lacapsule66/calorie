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
import { FormEvent, useEffect, useState } from "react";
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
import { WeightTrackingData } from "../(user)/api/user/[userprofileid]/route";

type CourbePoidsProps = {
  userProfileId: string;
};

export default function CourbePoids({ userProfileId }: CourbePoidsProps) {
  const [period, setPeriod] = useState<string>("30");
  const [data, setData] = useState<WeightTrackingData[]>([]);
  const [weight, setWeight] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/user/${userProfileId}`);
      const result: WeightTrackingData[] = await response.json();
      setData(result);
    };

    fetchData();
  }, [userProfileId]);

  const handleWeightSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!weight) return;

    const response = await fetch(`/api/user/${userProfileId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ weight: parseFloat(weight) }),
    });

    if (response.ok) {
      const newEntry: WeightTrackingData = await response.json();
      setData((prevData) => [
        ...prevData,
        newEntry, // Ajout direct de l'objet WeightTrackingData
      ]);
      setWeight("");
    }
  };

  // Formatage des données pour le graphique
  const formattedData = data.map((entry) => ({
    jour: new Date(entry.date).toLocaleDateString("fr-FR"),
    poids: entry.weight,
  }));
  const filteredData = formattedData.slice(-parseInt(period));

  const startWeight = filteredData[0]?.poids || 0;
  const endWeight = filteredData[filteredData.length - 1]?.poids || 0;
  const weightChange = endWeight - startWeight;
  const averageWeight =
    filteredData.reduce((sum, day) => sum + day.poids, 0) /
      filteredData.length || 0;

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
        <form
          onSubmit={handleWeightSubmit}
          className="mb-4 flex items-center gap-4"
        >
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Entrez votre poids"
            className="border rounded px-4 py-2"
            required
            min="40"
            max="120"
            step="0.1"
          />
          <button
            type="submit"
            className="bg-primary text-white rounded px-4 py-2 font-medium"
          >
            Mettre à jour le poids
          </button>
        </form>
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
