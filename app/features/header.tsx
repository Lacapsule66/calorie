"use client";

import { LogOut, MessageCircle, PieChart, Settings, User } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ThemeToggle } from "@/components/custom/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function MobileNavBar({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Vos-Cal Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-bold text-lg">Vos-Cal</span>
          </Link>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full"
                >
                  <Avatar className="size-8">
                    <AvatarImage
                      src="/avatars/01.png"
                      alt={session?.user?.name || "User avatar"}
                    />
                    <AvatarFallback>
                      {(session?.user?.name
                        ? session.user.name.charAt(0)
                        : session?.user?.email
                        ? session.user.email.charAt(0)
                        : ""
                      ).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  <DropdownMenuLabel className="px-2 py-1.5 text-sm font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session?.user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session?.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link
                    href="/user/profile"
                    className="flex items-center px-2 py-1.5 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="mr-2 size-4" />
                    Profile
                  </Link>
                  <Link
                    href="/user/billing"
                    className="flex items-center px-2 py-1.5 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="mr-2 size-4" />
                    Abonnement
                  </Link>
                  <Link
                    href="/goals"
                    className="flex items-center px-2 py-1.5 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <PieChart className="mr-2 size-4" />
                    Objectifs caloriques
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center px-2 py-1.5 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="mr-2 size-4" />
                    Paramètres
                  </Link>
                  <DropdownMenuSeparator />
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="mr-2 size-4" />
                    Déconnexion
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t">
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
          <Link
            href="/"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <MessageCircle className="size-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Assistant
            </span>
          </Link>
          <Link
            href="/today"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <PieChart className="size-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Calories
            </span>
          </Link>
          <Link
            href="/user/profile"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <User className="size-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Profile
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}
