"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const todoSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required."),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  dueDate: z.string().optional(),
});

type TodoFormData = z.infer<typeof todoSchema>;

export default function CreateTodoForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      priority: "MEDIUM",
      category: "Personel",
    },
  });

  const onSubmit = async (data: TodoFormData) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Task adding failed.");
      }
      reset();
      router.refresh();
      setIsOpen(false);
      alert("Task succesfully added.");
    } catch (error) {
      console.error(error);
      alert("Task adding error.");
    }
  };
  const inputClass =
    "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm transition-colors duration-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400";

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {!isOpen ? (
        <div className="text-center">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-indigo-500 hover:text-indigo-500 dark:border-gray-700 transition-all"
          >
            <span className="text-lg font-semibold">+ Yeni Görev Ekle</span>
          </button>
        </div>
      ) : (
        <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 border dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Yeni Görev Oluştur
            </h2>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Başlık
              </label>
              <input
                type="text"
                id="title"
                {...register("title")}
                className={`${inputClass} ${
                  errors.title ? "border-red-500" : ""
                }`}
                placeholder="Örn: Proje Raporu"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Açıklama
              </label>
              <textarea
                id="description"
                {...register("description")}
                rows={3}
                className={inputClass}
                placeholder="Detaylar..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Kategori
                </label>
                <input
                  type="text"
                  id="category"
                  {...register("category")}
                  className={`${inputClass} ${
                    errors.category ? "border-red-500" : ""
                  }`}
                  placeholder="İş, Okul vb."
                />
                {errors.category && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Öncelik
                </label>
                <select
                  id="priority"
                  {...register("priority")}
                  className={inputClass}
                >
                  <option value="LOW">Düşük</option>
                  <option value="MEDIUM">Orta</option>
                  <option value="HIGH">Yüksek</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Bitiş Tarihi
                </label>
                <input
                  type="date"
                  id="dueDate"
                  {...register("dueDate")}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
