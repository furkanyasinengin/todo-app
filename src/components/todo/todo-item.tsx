"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TodoForm from "./todo-form";

import { useLanguage } from "@/context/language-context";
import toast from "react-hot-toast";

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    description: string | null;
    isCompleted: boolean;
    priority: "LOW" | "MEDIUM" | "HIGH";
    category: string;
    dueDate: Date | null;
  };
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { t } = useLanguage();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const getRemaininTime = (dateInput?: Date | null) => {
    if (!dateInput) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dateInput);
    due.setHours(0, 0, 0, 0);

    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        text: `${Math.abs(diffDays)} ${t.dashboard.time.overdue}`,
        color:
          "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300",
      };
    } else if (diffDays === 0) {
      return {
        text: t.dashboard.time.today,
        color:
          "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300",
      };
    } else if (diffDays === 1) {
      return {
        text: t.dashboard.time.tomorrow,
        color:
          "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300",
      };
    } else {
      return {
        text: `${diffDays} ${t.dashboard.time.left}`,
        color:
          "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300",
      };
    }
  };

  const timeInfo = getRemaininTime(todo.dueDate);

  const toggleComplete = async () => {
    setIsLoading(true);
    try {
      await fetch(`/api/todos/${todo.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isCompleted: !todo.isCompleted }),
      });
      router.refresh();
    } catch {
      // console.error(error);
      toast.error(t.dashboard.todoList.updateError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(t.dashboard.todoList.confirmDelete)) return;

    setIsLoading(true);

    try {
      await fetch(`/api/todos/${todo.id}`, { method: "DELETE" });
      router.refresh();
    } catch {
      // console.error("Silinemedi");
      alert("Silinemedi");
      toast.error(t.dashboard.todoList.deleteError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`group p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700 ${
        isLoading ? "opacity-50" : ""
      } ${todo.isCompleted ? "bg-gray-50 dark:bg-gray-900/50" : ""}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-start w-full">
          {" "}
          <button
            onClick={toggleComplete}
            disabled={isLoading}
            className={`mt-1 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors 
            ${
              todo.isCompleted
                ? "bg-indigo-600 border-indigo-600 text-white"
                : "border-gray-300 hover:border-indigo-500 text-transparent"
            }`}
          >
            ✓
          </button>
          <div className="space-y-1 w-full">
            <div className="flex gap-2">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ml-auto sm:ml-0
                ${
                  todo.priority === "HIGH"
                    ? "bg-red-50 text-red-700 border border-red-100"
                    : todo.priority === "MEDIUM"
                    ? "bg-yellow-50 text-yellow-700 border border-yellow-100"
                    : "bg-blue-50 text-blue-700 border border-blue-100"
                }`}
              >
                {todo.priority === "HIGH"
                  ? t.dashboard.filter.high
                  : todo.priority === "MEDIUM"
                  ? t.dashboard.filter.medium
                  : t.dashboard.filter.low}
              </span>
              {timeInfo && !todo.isCompleted && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${timeInfo.color}`}
                >
                  {timeInfo.text}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className={`font-medium text-gray-900 dark:text-white transition-all ${
                  todo.isCompleted ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.title}
              </h3>
            </div>

            {todo.description && (
              <p
                className={`text-sm text-gray-500 dark:text-gray-400 line-clamp-2 ${
                  todo.isCompleted ? "line-through opacity-50" : ""
                }`}
              >
                {todo.description}
              </p>
            )}

            <div className="flex gap-4 pt-1 text-xs text-gray-400">
              {todo.dueDate && (
                <span className="flex items-center gap-1">
                  📅 {new Date(todo.dueDate).toLocaleDateString("tr-TR")}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pl-2">
          <TodoForm todoToEdit={todo} />
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-2 transition-all"
            title={t.dashboard.todoList.delete}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
