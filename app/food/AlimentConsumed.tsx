"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface Aliment {
  id: string;
  aliment: string;
  calories: number;
  glucides: number;
  lipides: number;
  proteines: number;
  userId: string;
  createdAt: Date;
}

interface AlimentsTableProps {
  aliments: Aliment[];
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function AlimentsTable({ aliments }: AlimentsTableProps) {
  const [selectedAliment, setSelectedAliment] = useState<Aliment | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tableau des aliments</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Aliment</TableHead>
            <TableHead className="text-right">Calories</TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Protéines
            </TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Glucides
            </TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Lipides
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {aliments.map((aliment) => (
            <TableRow key={aliment.id}>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      className="p-0"
                      onClick={() => setSelectedAliment(aliment)}
                    >
                      {truncateText(aliment.aliment, 20)}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{aliment.aliment}</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <div>Calories:</div>
                      <div>{aliment.calories}</div>
                      <div>Protéines:</div>
                      <div>{aliment.proteines}g</div>
                      <div>Glucides:</div>
                      <div>{aliment.glucides}g</div>
                      <div>Lipides:</div>
                      <div>{aliment.lipides}g</div>
                      <div>Date d'ajout:</div>
                      <div>
                        {new Date(aliment.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell className="text-right">{aliment.calories}</TableCell>
              <TableCell className="hidden md:table-cell text-right">
                {aliment.proteines}g
              </TableCell>
              <TableCell className="hidden md:table-cell text-right">
                {aliment.glucides}g
              </TableCell>
              <TableCell className="hidden md:table-cell text-right">
                {aliment.lipides}g
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
