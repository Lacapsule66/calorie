import { Metadata } from "next";

import { ThemeProvider } from "@/components/custom/theme-provider";

import { auth } from "./(auth)/auth";
import Header from "./features/header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gemini.vercel.ai"),
  title: "Next.js Gemini Chatbot",
  description: "Next.js chatbot template using the AI SDK and Gemini.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="fr">
      <body className=" h-screen relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Header session={session} />
        </ThemeProvider>
      </body>
    </html>
  );
}
