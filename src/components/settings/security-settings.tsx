"use client";

import { useState } from "react";
import { useLanguage } from "@/context/language-context";
import toast from "react-hot-toast";

export default function SecuritySettings() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (passwords.new !== passwords.confirm) {
      toast.error(t.settingsPage.security.mismatch);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/user/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error");
      }

      toast.success(t.settingsPage.security.success);
      setPasswords({ current: "", new: "", confirm: "" }); // Formu temizle
    } catch (error) {
      toast.error(t.settingsPage.security.error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white";

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        {t.settingsPage.security.title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.settingsPage.security.currentPassword}
          </label>
          <input
            type="password"
            name="current"
            required
            value={passwords.current}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.settingsPage.security.newPassword}
          </label>
          <input
            type="password"
            name="new"
            required
            minLength={6}
            value={passwords.new}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.settingsPage.security.confirmPassword}
          </label>
          <input
            type="password"
            name="confirm"
            required
            minLength={6}
            value={passwords.confirm}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "..." : t.settingsPage.security.change}
          </button>
        </div>
      </form>
    </div>
  );
}
