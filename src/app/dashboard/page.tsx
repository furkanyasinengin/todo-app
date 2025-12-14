import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt } from "@/lib/jwt";
import { getTodoList } from "@/services/todo.service";
import DashboardClient from "@/components/dashboard/dashboard-client";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function DashboardPage(props: {
  searchParams: SearchParams;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const verifiedToken = token ? verifyJwt(token) : null;

  if (!verifiedToken) {
    redirect("/login");
  }

  const params = await props.searchParams;
  const search = typeof params.search === "string" ? params.search : undefined;
  const priority =
    typeof params.priority === "string" ? params.priority : undefined;

  const todos = await getTodoList(verifiedToken.id as string, search, priority);

  return <DashboardClient todos={todos} />;
}
