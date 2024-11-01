import { Metadata } from "next";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/custom/theme-provider";

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
  return (
    <html lang="fr">
      <body className="antialiased max-h-screen flex flex-col gap-2 container">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Toaster position="top-center" />

          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
