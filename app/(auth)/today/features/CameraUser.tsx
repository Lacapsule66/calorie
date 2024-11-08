// UserCamera.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Camera } from "lucide-react";
import React, { useRef, useState } from "react";

const UserCamera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const startCameraStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsStreaming(true);
    } catch (error) {
      console.error("Erreur lors de l’accès à la caméra :", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Button
          onClick={startCameraStream}
          className="flex items-center space-x-2"
        >
          <Camera className="size-5" />
          <span>Activer la caméra</span>
        </Button>
      </CardHeader>
      <CardContent>
        {isStreaming ? (
          <video
            ref={videoRef}
            className="w-full h-auto rounded-lg"
            autoPlay
            playsInline
          />
        ) : (
          <p>Appuyez sur le bouton pour démarrer la caméra.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCamera;
