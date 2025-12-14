"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import toast from "react-hot-toast";

export default function DangerZone() {
  const { t } = useLanguage();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      toast.success("Account deleted.");
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error(t.settingsPage.form.errorMessage || "Error");
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm dark:bg-red-900/10 dark:border-red-900/50">
        <h2 className="text-lg font-semibold mb-2 text-red-900 dark:text-red-400">
          {t.settingsPage.danger.title}
        </h2>
        <p className="text-sm text-red-700 dark:text-red-300 mb-4">
          {t.settingsPage.danger.text}
        </p>

        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            {t.settingsPage.danger.delete}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800 border dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {t.settingsPage.danger.modalTitle}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
              {t.settingsPage.danger.text}
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                {t.settingsPage.danger.modalCancel}
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isLoading ? "..." : t.settingsPage.danger.modalConfirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
