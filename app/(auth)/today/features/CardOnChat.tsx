"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Mic } from "lucide-react";
import { useEffect, useState } from "react";

export default function CardOnChat() {
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (shouldScroll) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  const handleButtonClick = () => {
    setShouldScroll(true);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">
          Assistant Compteur de Calories
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground">
          Je suis là pour vous aider à compter vos calories. C'est simple et
          rapide !
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={handleButtonClick}
          >
            <Mic className="size-5" />
            <span>Utiliser le micro</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={handleButtonClick}
          >
            <MessageSquare className="size-5" />
            <span>Écrire un message</span>
          </Button>
        </div>
        <p className="text-sm text-center text-muted-foreground">
          Cliquez sur l'icône du micro pour parler ou utilisez le texte pour
          décrire vos aliments. Je vous guiderai tout au long du processus.
        </p>
      </CardContent>
    </Card>
  );
}
