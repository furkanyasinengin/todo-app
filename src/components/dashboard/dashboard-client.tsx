"use client";

import React from "react";
import TodoForm from "@/components/todo/todo-form";
import TodoItem from "@/components/todo/todo-item";
import TodoFilter from "@/components/todo/todo-filter";
import { useLanguage } from "@/context/language-context";

interface Todo {
  id: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  category: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

interface DashboardClientProps {
  todos: Todo[];
}

export default function DashboardClient({ todos }: DashboardClientProps) {
  const { t } = useLanguage();
  const totalTodos = todos.length;
  const completedTodos = todos.filter((t) => t.isCompleted).length;
  const pendingTodos = totalTodos - completedTodos;
  const highPriorityTodos = todos.filter(
    (t) => t.priority === "HIGH" && !t.isCompleted
  ).length;

  const groupedTodos = todos.reduce((groups, todo) => {
    const category = todo.category || "GENERAL";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(todo);
    return groups;
  }, {} as Record<string, Todo[]>);

  const getCategoryName = (cat: string) => {
    return t.categories[cat.toLowerCase() as keyof typeof t.categories] || cat;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex w-full justify-between mb-6 items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t.dashboard.title}
          </h1>
          <p className="text-muted-foreground mt-1">{t.dashboard.subtitle}</p>
        </div>
        <TodoForm />
      </div>
      <TodoFilter />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500 dark:text-gray-400">
              {t.dashboard.stats.total}
            </h3>
            <span className="text-gray-500">📋</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {totalTodos}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500 dark:text-gray-400">
              {t.dashboard.stats.completed}
            </h3>
            <span className="text-green-500">✓</span>
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {completedTodos}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500 dark:text-gray-400">
              {t.dashboard.stats.pending}
            </h3>
            <span className="text-yellow-500">⏳</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {pendingTodos}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500 dark:text-gray-400">
              {t.dashboard.stats.highPriority}
            </h3>
            <span className="text-red-500">🔥</span>
          </div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {highPriorityTodos}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          {t.dashboard.headers.myTasks}
          <span className="text-sm font-normal bg-gray-100 px-2 py-1 rounded-full dark:bg-gray-700">
            {todos.length}
          </span>
        </h2>

        {todos.length === 0 ? (
          <div className="p-6 border-2 border-dashed rounded-xl text-center">
            <p className="text-gray-500">{t.dashboard.emptyState}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedTodos).map(([category, items]) => (
              <div key={category} className="space-y-3">
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-gray-200 border-b pb-2 border-gray-200 dark:border-gray-700">
                  <span className="inline-block w-2 h-6 rounded bg-indigo-500"></span>
                  {getCategoryName(category)}
                  <span className="ml-auto text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                    {items.length}
                  </span>
                </h3>

                <div className="grid gap-3">
                  {items.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
