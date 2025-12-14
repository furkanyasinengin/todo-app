import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import SettingsClient from "@/components/settings/settings-client";

export const metadata = {
  title: "Todo App | Settings",
  description: "Advanced Todo Application",
};

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const decoded = verifyJwt(token);
  if (!decoded || !decoded.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: decoded.id as string },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });

  return user;
}

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return <SettingsClient user={user} />;
}
