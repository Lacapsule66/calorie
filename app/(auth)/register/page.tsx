"use client";

import { AuthForm } from "@/components/custom/auth-form";
import { SubmitButton } from "@/components/custom/submit-button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { register, RegisterActionState } from "../actions";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    register,
    {
      status: "idle",
    }
  );

  useEffect(() => {
    if (state.status === "user_exists") {
      toast.error("Ce compte existe déjà");
    } else if (state.status === "failed") {
      toast.error("Échec de la création du compte");
    } else if (state.status === "invalid_data") {
      toast.error("Échec de la validation de votre soumission !");
    } else if (state.status === "success") {
      toast.success("Compte créé avec succès");
      router.refresh();
    }
  }, [state, router]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            S'inscrire
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Créez un compte avec votre email et mot de passe
          </p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton>S'inscrire</SubmitButton>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Vous avez déjà un compte ?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary-dark transition duration-150 ease-in-out"
            >
              Connectez-vous
            </Link>{" "}
            ici.
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
