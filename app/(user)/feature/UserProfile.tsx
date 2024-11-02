"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type UserProfileProps = {
  user: {
    id: string;
    email: string;
    name: string | null;
    profile: {
      age: number;
      weight: number;
      height: number;
      objectif: string;
      sportFrequency: string;
    } | null;
  };
};

export default function UserProfile(
  { user }: UserProfileProps = {
    user: {
      id: "123e4567-e89b-12d3-a456-426614174000",
      email: "user@example.com",
      name: "John Doe",
      profile: {
        age: 30,
        weight: 70,
        height: 175,
        objectif: "Perdre du poids",
        sportFrequency: "Régulièrement",
      },
    },
  }
) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    age: user.profile?.age || "",
    weight: user.profile?.weight || "",
    height: user.profile?.height || "",
    objectif: user.profile?.objectif || "",
    sportFrequency: user.profile?.sportFrequency || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    console.log("Updated profile data:", formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Profil Utilisateur
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Âge</Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Poids (kg)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Taille (cm)</Label>
            <Input
              id="height"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="objectif">Objectif</Label>
            <Select
              name="objectif"
              value={formData.objectif}
              onValueChange={(value) =>
                setFormData({ ...formData, objectif: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un objectif" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Perdre du poids">Perdre du poids</SelectItem>
                <SelectItem value="Prendre du muscle">
                  Prendre du muscle
                </SelectItem>
                <SelectItem value="Maintenir son poids">
                  Maintenir son poids
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sportFrequency">Fréquence sportive</Label>
            <Select
              name="sportFrequency"
              value={formData.sportFrequency}
              onValueChange={(value) =>
                setFormData({ ...formData, sportFrequency: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une fréquence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rarement">Rarement</SelectItem>
                <SelectItem value="Occasionnellement">
                  Occasionnellement
                </SelectItem>
                <SelectItem value="Régulièrement">Régulièrement</SelectItem>
                <SelectItem value="Quotidiennement">Quotidiennement</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Mettre à jour le profil
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
