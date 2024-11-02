"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Bell,
  LogOut,
  Menu,
  MessageCircle,
  PieChart,
  Settings,
  User,
} from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Header({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                <Link
                  className="flex items-center"
                  href="/"
                  onClick={() => setIsOpen(false)}
                >
                  <PieChart className="size-6 mr-2" />
                  <span className="font-bold">FitTrack</span>
                </Link>
                <Link
                  className="text-foreground/60 hover:text-foreground"
                  href="/"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageCircle className="size-4 mr-2 inline-block" />
                  Chat
                </Link>
                <Link
                  className="text-foreground/60 hover:text-foreground"
                  href="/today"
                  onClick={() => setIsOpen(false)}
                >
                  <PieChart className="size-4 mr-2 inline-block" />
                  Suivi Calories
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link className="flex items-center space-x-2 md:mr-6" href="/">
            <PieChart className="size-6" />
            <span className="font-bold hidden md:inline-block">FitTrack</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link className="text-foreground/60 hover:text-foreground" href="/">
              <MessageCircle className="size-4 mr-1 inline-block" />
              Chat
            </Link>
            <Link
              className="text-foreground/60 hover:text-foreground"
              href="/today"
            >
              <PieChart className="size-4 mr-1 inline-block" />
              Suivi Calories
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="icon" variant="ghost">
            <Bell className="size-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative size-8 rounded-full">
                <Avatar className="size-8">
                  <AvatarImage src="/avatars/01.png" alt="@username" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
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
              <DropdownMenuItem>
                <User className="mr-2 size-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PieChart className="mr-2 size-4" />
                <span>Objectifs caloriques</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageCircle className="mr-2 size-4" />
                <span>Messages</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 size-4" />
                <span>Paramètres</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 size-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
