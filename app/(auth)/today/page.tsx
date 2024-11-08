// Importations nécessaires
import { default as AlimentsTable } from "@/app/food/AlimentConsumed";
import prisma from "@/lib/prisma";

import CourbePoids from "@/app/features/courbe-poids";
import { auth } from "../auth";
import CalorieChart from "./features/camenbertCal";
import CameraUser from "./features/CameraUser";
import { CompteurMacro } from "./features/CompteurMacro";

// Fonction pour récupérer les aliments d'un utilisateur spécifique
async function getAlimentsByUserId(userId: string) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  // Fin de la journée à 23h59:59.999
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  return await prisma.aliment.findMany({
    where: {
      userId: userId,
      createdAt: {
        gte: startOfDay, // Supérieur ou égal à minuit
        lte: endOfDay, // Inférieur ou égal à 23h59:59
      },
    },
  });
}

export default async function page() {
  const session = await auth();
  // ID utilisateur fictif
  const userId = session?.user?.id || "";

  // Récupère les aliments pour cet utilisateur
  const userAliments = await getAlimentsByUserId(userId);
  const weightData = [
    { date: "2024-10-01", weight: 74 },
    { date: "2024-10-02", weight: 73.8 },
    { date: "2024-10-03", weight: 73.6 },
    { date: "2024-10-04", weight: 73.4 },
    // Ajoutez autant de données que nécessaire
  ];
  return (
    <div className="flex flex-col gap-4 mt-4 items-center ">
      <CameraUser />
      <CalorieChart userAliments={userAliments} />
      <CompteurMacro userAliments={userAliments} />
      <AlimentsTable aliments={userAliments} />
      <CourbePoids userProfileId={userId} />
    </div>
  );
}
