import { Chat } from "@/components/custom/chat";
import prisma from "@/lib/prisma";
import { generateUUID } from "@/lib/utils";
import { redirect } from "next/navigation";
import { auth } from "../(auth)/auth";

export default async function Page() {
  const id = generateUUID();

  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const userProfil = await prisma.userProfile.findUnique({
    where: {
      userId: session?.user?.id ?? "",
    },
  });

  return <Chat session={session} key={id} id={id} initialMessages={[]} />;
}
