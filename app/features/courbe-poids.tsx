"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Générer des données fictives pour 30 jours
const generateData = () => {
  const data = [];
  let weight = 70; // Poids initial
  for (let i = 1; i <= 30; i++) {
    weight += Math.random() * 0.4 - 0.2; // Variation aléatoire entre -0.2 et 0.2 kg
    data.push({
      jour: i,
      poids: parseFloat(weight.toFixed(1)),
    });
  }
  return data;
};

const data = generateData();

export default function CourbePoids() {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Courbe de Poids Journalier</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="jour" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="poids"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
