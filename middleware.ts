// middleware.ts

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Token from Auth.js (NextAuth)
  const token = await getToken({
    req,
    secret: "JT+B2CM7T62wmU+eHExjDBBzw25lENSBYIZFAmjiJ2s=",
  });

  // Définir les chemins que vous souhaitez exclure de la protection
  const excludedPaths = ["/login", "/signup", "/public-page", "/register"];

  // Vérifie si le chemin fait partie des exceptions
  if (excludedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Redirige vers la page de connexion si pas de session
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Cela inclut toutes les routes sauf celles spécifiées dans excludedPaths.
    "/((?!_next/static|favicon.ico).*)",
  ],
};
