import { useChat } from "ai/react";
import React from "react";

// Type des props pour le composant
type QuestionChoiceProps = {
  chatId: string;
  data: {
    question: string;
    choice: {
      oui: string;
      non: string;
    };
  };
  onChoice: (choice: string) => void; // Fonction pour gérer le choix de l'utilisateur
};

const QuestionChoice: React.FC<QuestionChoiceProps> = ({
  chatId,
  data,
  onChoice,
}) => {
  const { append } = useChat({
    id: chatId,
    body: { id: chatId },
    maxSteps: 1,
  });

  return (
    <div className="flex flex-col items-center space-y-4 p-6 border border-gray-200 rounded-lg shadow-md">
      {/* Affiche la question */}
      <h2 className="text-lg font-semibold text-gray-800">{data.question}</h2>

      {/* Boutons de choix */}
      <div className="flex space-x-4">
        <button
          onClick={() => {
            append({
              role: "user",
              content: "oui",
            });
          }}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Oui
        </button>
        <button
          onClick={() => {
            append({
              role: "user",
              content: "non",
            });
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Non
        </button>
      </div>
    </div>
  );
};

export default QuestionChoice;
