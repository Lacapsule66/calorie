"use client";
import { Message } from "ai";
import { ArrowUp, Mic, MicOff, StopCircle } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import useWindowSize from "./use-window-size";

interface MultimodalInputProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  stop: () => void;
  messages: Array<Message>;
  handleSubmit: (event?: React.FormEvent) => void;
}

export function MultimodalInput({
  input,
  setInput,
  isLoading,
  stop,
  messages,
  handleSubmit,
}: MultimodalInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();

  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isRecording, setIsRecording] = useState<boolean>(false);

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  useEffect(() => {
    if (isRecording) {
      setInput(transcript);
      adjustHeight();
    }
  }, [transcript, isRecording, setInput]);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();

    if (event.target.value === "") {
      resetTranscript();
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: "fr-FR" });
    } else {
      SpeechRecognition.stopListening();
    }
    setIsRecording(!isRecording);
  };

  const submitForm = useCallback(() => {
    handleSubmit();
    if (width && width > 768) {
      textareaRef.current?.focus();
    }
    resetTranscript();

    // Envoyer le boolean true à Expo
    if (window.ReactNativeWebView) {
      const message = true;
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
      console.log("Boolean envoyé :", message); // Log dans la console
      alert("Boolean envoyé avec succès !"); // Alerte pour confirmation
    } else {
      console.warn("ReactNativeWebView non disponible");
    }
  }, [handleSubmit, width, resetTranscript]);

  return (
    <div className="relative w-full flex flex-col gap-4">
      <Textarea
        ref={textareaRef}
        placeholder="Envoyer un message..."
        value={input}
        onChange={handleInput}
        className="min-h-[24px] overflow-hidden resize-none rounded-lg text-base bg-muted border-none"
        rows={3}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (isLoading) {
              toast.error("Veuillez attendre la fin de la réponse du modèle !");
            } else {
              submitForm();
            }
          }
        }}
      />

      {isLoading ? (
        <Button
          className="rounded-full p-1.5 h-fit absolute bottom-2 right-0 m-0.5 text-white"
          onClick={(event) => {
            event.preventDefault();
            stop();
          }}
        >
          <StopCircle size={22} />
        </Button>
      ) : (
        <>
          <Button
            className="rounded-full p-1.5 h-fit absolute bottom-2 right-0 m-0.5 text-white"
            onClick={(event) => {
              event.preventDefault();
              submitForm();
            }}
            disabled={input.length === 0}
          >
            <ArrowUp size={22} />
          </Button>

          <Button
            type="button"
            variant={isRecording ? "destructive" : "secondary"}
            size="icon"
            onClick={toggleRecording}
            className="rounded-full p-1.5 h-fit absolute bottom-2 right-10 m-0.5"
            disabled={isLoading}
          >
            {isRecording ? (
              <MicOff size={22} className="animate-pulse" />
            ) : (
              <Mic size={22} />
            )}
          </Button>
        </>
      )}
    </div>
  );
}
