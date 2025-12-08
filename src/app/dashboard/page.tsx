import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt } from "@/lib/jwt";
import { getTodoList } from "@/services/todo.service";
import CreateTodoForm from "@/components/create-todo-form";
import TodoItem from "@/components/todo-item";
import TodoFilter from "@/components/todo-filter";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function DashboardPage(props: {
  searchParams: SearchParams;
}) {
  const params = await props.searchParams;
  const search = typeof params.search === "string" ? params.search : undefined;
  const priority =
    typeof params.priority === "string" ? params.priority : undefined;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const verifiedToken = token ? verifyJwt(token) : null;

  if (!verifiedToken) {
    redirect("/login");
  }

  const todos = await getTodoList(verifiedToken.id as string, search, priority);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Görev Paneli</h1>
          <p className="text-muted-foreground mt-1">
            Hoş geldin! Toplam {todos.length} görevin var.
          </p>
        </div>
      </div>
      <CreateTodoForm />
      <TodoFilter />
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Görevlerim</h2>
        {todos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed dark:bg-gray-800 dark:border-gray-700">
            <p className="text-gray-500">
              Henüz hiç görevin yok. Yukarıdan bir tane ekle!
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
