"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

type Plan = "gratuit" | "Sans limite" | "entreprise";

type Facture = {
  id: string;
  date: string;
  montant: number;
  statut: "Payée" | "En attente";
};

export default function PageFacturation() {
  const [planActuel, setPlanActuel] = useState<Plan>("gratuit");
  const [facturationAnnuelle, setFacturationAnnuelle] = useState(false);

  const factures: Facture[] = [
    { id: "001", date: "01/05/2023", montant: 9.99, statut: "Payée" },
    { id: "002", date: "01/06/2023", montant: 9.99, statut: "Payée" },
    { id: "003", date: "01/07/2023", montant: 9.99, statut: "En attente" },
  ];

  const plans = {
    gratuit: { prix: 0, description: "Pour les utilisateurs occasionnels" },
    full: {
      prix: facturationAnnuelle ? 8.99 : 9.99,
      description: "Pour les utilisateurs réguliers",
    },
    entreprise: {
      prix: facturationAnnuelle ? 15.99 : 17.99,
      description: "Pour les équipes et les entreprises",
    },
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Facturation</CardTitle>
          <CardDescription>
            Gérez votre abonnement et vos informations de paiement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Plan actuel</h3>
            <p>
              Vous êtes actuellement sur le plan{" "}
              <span className="font-medium">
                {planActuel.charAt(0).toUpperCase() + planActuel.slice(1)}
              </span>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Choisissez un plan</h3>
            <RadioGroup
              value={planActuel}
              onValueChange={(value: Plan) => setPlanActuel(value)}
            >
              {Object.entries(plans).map(([plan, details]) => (
                <div key={plan} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={plan} id={plan} />
                  <Label htmlFor={plan}>
                    {plan.charAt(0).toUpperCase() + plan.slice(1)} -{" "}
                    {details.prix}€
                    {facturationAnnuelle && plan !== "gratuit"
                      ? "/mois (facturé annuellement)"
                      : "/mois"}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="facturation-annuelle"
              checked={facturationAnnuelle}
              onCheckedChange={setFacturationAnnuelle}
            />
            <Label htmlFor="facturation-annuelle">
              Facturation annuelle (économisez 10%)
            </Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Mettre à jour l'abonnement</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Historique des factures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro de facture</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {factures.map((facture) => (
                <TableRow key={facture.id}>
                  <TableCell>{facture.id}</TableCell>
                  <TableCell>{facture.date}</TableCell>
                  <TableCell>{facture.montant.toFixed(2)}€</TableCell>
                  <TableCell>{facture.statut}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
