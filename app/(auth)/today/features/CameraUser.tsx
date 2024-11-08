"use client";

import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useCallback, useRef, useState } from "react";

export default function CameraUser() {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraOn(true);
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsCameraOn(false);
  }, []);

  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Button
        onClick={toggleCamera}
        className="mb-4"
        aria-label={isCameraOn ? "Arrêter la caméra" : "Démarrer la caméra"}
      >
        <Camera className="mr-2 size-4" />
        {isCameraOn ? "Arrêter la caméra" : "Démarrer la caméra"}
      </Button>

      {isCameraOn && (
        <div className="relative w-full max-w-md aspect-[3/4] bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 size-full object-cover"
            playsInline
            autoPlay
            muted
          />
        </div>
      )}
    </div>
  );
}
