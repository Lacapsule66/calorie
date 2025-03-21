"use client";
import { useEffect, useState } from "react";

const Test = () => {
  const [message, setMessage] = useState();
  // Fonction pour envoyer un message à l'application Expo
  const sendMessageToApp = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage("Message from Next.js WebView");
    }
  };

  useEffect(() => {
    // Appel de la fonction pour envoyer un message après le chargement
    sendMessageToApp();

    // Gérer la réception de messages depuis l'application Expo
    window.addEventListener("message", (event) => {
      if (event.data) {
        console.log("Message reçu depuis Expo :", event.data);
        setMessage(event.data);
      }
    });

    return () => {
      window.removeEventListener("message", (event) => {
        console.log("Listener nettoyé");
      });
    };
  }, []);

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={sendMessageToApp}>Send Message to Expo App</button>
    </div>
  );
};

export default Test;
