"use client";

import { AuthForm } from "@/components/custom/auth-form";
import { SubmitButton } from "@/components/custom/submit-button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { login, LoginActionState } from "../actions";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: "idle",
    }
  );
  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    if (state.status === "failed") {
      toast.error("Identifiants incorrects !");
    } else if (state.status === "invalid_data") {
      toast.error("Échec de la validation de votre soumission !");
    } else if (state.status === "success") {
      router.push("/");
    }
  }, [state.status, router]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Connexion
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Utilisez votre adresse email et votre mot de passe pour vous
            connecter
          </p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton>Se connecter</SubmitButton>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Vous n'avez pas de compte ?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:text-primary-dark transition duration-150 ease-in-out"
            >
              Inscrivez-vous
            </Link>{" "}
            gratuitement.
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
