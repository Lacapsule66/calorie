"use client";
import React, { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Camera, CameraOff } from "lucide-react";

const UserCamera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const startCameraStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsStreaming(true);
    } catch (error) {
      console.error("Erreur lors de l’accès à la caméra :", error);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        setPhoto(imageData);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex space-x-2">
          <Button
            onClick={startCameraStream}
            className="flex items-center space-x-2"
          >
            <Camera className="size-5" />
            <span>Activer la caméra arrière</span>
          </Button>
          {isStreaming && (
            <Button onClick={takePhoto} className="flex items-center space-x-2">
              <CameraOff className="size-5" />
              <span>Prendre une photo</span>
            </Button>
          )}
        </div>
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
        {photo && (
          <div className="mt-4">
            <img
              src={photo}
              alt="Photo prise"
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </CardContent>
    </Card>
  );
};

export default UserCamera;
