"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const toggleComplete = async () => {
    setIsLoading(true);
    try {
      await fetch(`/api/todos/${todo.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isCompleted: !todo.isCompleted }),
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Bu görevi silmek istediğine emin misin?")) return;

    setIsLoading(true);

    try {
      await fetch(`/api/todos/${todo.id}`, { method: "DELETE" });
      router.refresh();
    } catch (error) {
      console.error("Silinemedi");
      alert("Silinemedi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`group p-5 border rounded-xl bg-white shadow-sm hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700 ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-start">
          <button
            onClick={toggleComplete}
            disabled={isLoading}
            className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center transition-colors 
              ${
                todo.isCompleted
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-400 hover:border-indigo-500"
              }`}
          >
            {todo.isCompleted && "✓"}
          </button>
          <div className="space-y-1">
            <h3
              className={`font-bold text-lg transition-all ${
                todo.isCompleted ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.title}
            </h3>
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
                  📅 {new Date(todo.dueDate).toLocaleDateString("tr-TR")}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
          title="Görevi Sil"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
