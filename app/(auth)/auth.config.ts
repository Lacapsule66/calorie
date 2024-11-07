import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/",
  },
  providers: [
    // Added in auth.ts where Node.js is used
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // Retourne vrai si l'utilisateur est authentifié pour les pages autorisées
      return (
        !!auth?.user ||
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register")
      );
    },
    async redirect({ url }) {
      // Redirige vers la racine après la connexion
      return url.startsWith("/") ? url : "/";
    },
  },
} satisfies NextAuthConfig;
