"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import toast from "react-hot-toast";

interface TodoFormProps {
  todoToEdit?: {
    id: string;
    title: string;
    description: string | null;
    category: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: Date | null;
  };
}

export default function TodoForm({ todoToEdit }: TodoFormProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isEditMode = !!todoToEdit;

  const todoSchema = z.object({
    title: z
      .string()
      .min(1, t.dashboard.form.titleRequired || "Title is required."),
    description: z.string().optional(),
    category: z
      .string()
      .min(1, t.dashboard.form.categoryRequired || "Category is required."),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    dueDate: z.string().optional(),
  });

  type TodoFormData = z.infer<typeof todoSchema>;

  const formattedDate = todoToEdit?.dueDate
    ? new Date(todoToEdit.dueDate).toISOString().split("T")[0]
    : "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todoToEdit?.title || "",
      description: todoToEdit?.description || "",
      category: todoToEdit?.category || "general",
      priority: todoToEdit?.priority || "MEDIUM",
      dueDate: formattedDate,
    },
  });

  const onSubmit = async (data: TodoFormData) => {
    try {
      const url = isEditMode ? `/api/todos/${todoToEdit.id}` : "/api/todos";
      const method = isEditMode ? "PATCH" : "POST";
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Task adding failed.");
      }
      if (!isEditMode) reset();

      router.refresh();
      setIsOpen(false);
      toast.success(
        isEditMode
          ? t.dashboard.form.updateSuccess
          : t.dashboard.form.saveSuccess
      );
    } catch {
      // console.error(error);
      toast.error(t.dashboard.form.errorMessage);
    }
  };

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };
  const inputClass =
    "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm transition-colors duration-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400";

  return (
    <div
      className={isEditMode || !isOpen ? "" : "w-full max-w-2xl mx-auto mb-8"}
    >
      {!isOpen &&
        (isEditMode ? (
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-400 hover:text-indigo-500 p-2 transition-colors"
            title={t.dashboard.form.edit}
          >
            {t.dashboard.form.edit}
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-2xl text-sm font-medium transition-colors shadow-sm"
          >
            <span className="text-lg font-semibold">
              + {t.dashboard.form.newTask}
            </span>
          </button>
        ))}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800 border dark:border-gray-700 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {isEditMode
                  ? t.dashboard.form.editTask
                  : t.dashboard.form.newTask}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-red-500 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t.dashboard.form.title}
                </label>
                <input
                  type="text"
                  {...register("title")}
                  className={`${inputClass} ${
                    errors.title ? "border-red-500" : ""
                  }`}
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t.dashboard.form.description}
                </label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t.dashboard.form.category}
                  </label>
                  <select {...register("category")} className={inputClass}>
                    {Object.entries(t.categories).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t.dashboard.form.priority}
                  </label>
                  <select {...register("priority")} className={inputClass}>
                    <option value="LOW">{t.dashboard.filter.low}</option>
                    <option value="MEDIUM">{t.dashboard.filter.medium}</option>
                    <option value="HIGH">{t.dashboard.filter.high}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t.dashboard.form.date}
                  </label>
                  <input
                    type="date"
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
                  {t.dashboard.form.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isSubmitting
                    ? t.dashboard.form.saving
                    : isEditMode
                    ? t.dashboard.form.update
                    : t.dashboard.form.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
