"use client";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Camera, RefreshCw } from "lucide-react";

const UserCamera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const startCameraStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setStream(mediaStream);
      setIsStreaming(true);
    } catch (error) {
      console.error("Erreur lors de l’accès à la caméra :", error);
    }
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [stream]);

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
        // Arrêter le flux vidéo lorsque la photo est prise
        video.pause();
        stream?.getTracks().forEach((track) => track.stop());
        setIsStreaming(false);
      }
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
    startCameraStream();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex space-x-2">
          {!isStreaming && !photo && (
            <Button
              onClick={startCameraStream}
              className="flex items-center space-x-2"
            >
              <Camera className="size-5" />
              <span>Activer la caméra arrière</span>
            </Button>
          )}
          {isStreaming && (
            <Button onClick={takePhoto} className="flex items-center space-x-2">
              <Camera className="size-5" />
              <span>Prendre une photo</span>
            </Button>
          )}
          {photo && (
            <Button
              onClick={retakePhoto}
              className="flex items-center space-x-2"
            >
              <RefreshCw className="size-5" />
              <span>Reprendre la photo</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="relative">
        {isStreaming && (
          <video
            ref={videoRef}
            className="w-full h-auto rounded-lg"
            autoPlay
            playsInline
          />
        )}
        {photo && (
          <img
            src={photo}
            alt="Photo prise"
            className="w-full h-auto rounded-lg absolute top-0 left-0"
          />
        )}
        {!isStreaming && !photo && (
          <p>Appuyez sur le bouton pour démarrer la caméra.</p>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </CardContent>
    </Card>
  );
};

export default UserCamera;
