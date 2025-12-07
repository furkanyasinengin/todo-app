import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt } from "@/lib/jwt";
import { getTodoList } from "@/services/todo.service";
import CreateTodoForm from "@/components/create-todo-form";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const verifiedToken = token ? verifyJwt(token) : null;

  if (!verifiedToken) {
    redirect("/login");
  }

  const todos = await getTodoList(verifiedToken.id as string);

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
              <div
                key={todo.id}
                className="p-5 border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border:gray-700"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3>{todo.title}</h3>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider
                        ${
                          todo.priority === "HIGH"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : todo.priority === "MEDIUM"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        }`}
                      >
                        {todo.priority}
                      </span>
                    </div>
                    {todo.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {todo.description}
                      </p>
                    )}
                    <div className="flex gap-4 pt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        📂 {todo.category}
                      </span>
                      {todo.dueDate && (
                        <span className="flex items-center gap-1">
                          📅{" "}
                          {new Date(todo.dueDate).toLocaleDateString("tr-TR")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        todo.isCompleted ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
