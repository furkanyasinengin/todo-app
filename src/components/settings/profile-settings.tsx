"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import toast from "react-hot-toast";
import Image from "next/image";

const AVATARS = [
  "Felix",
  "Aneka",
  "Zack",
  "Midnight",
  "Rocky",
  "Trouble",
  "Bandit",
  "Shadow",
];

interface ProfileSettingsProps {
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

export default function ProfileSettings({ user }: ProfileSettingsProps) {
  const { t } = useLanguage();
  const router = useRouter();

  const [name, setName] = useState(user.name || "");
  const [selectedAvatar, setSelectedAvatar] = useState(
    user.image || AVATARS[0]
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image: selectedAvatar }),
      });
      if (!response.ok) throw new Error("Update failed");
      toast.success(t.settingsPage.profile.success);
      router.refresh();
    } catch {
      toast.error(t.settingsPage.form.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        {t.settingsPage.profile.title}
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t.settingsPage.profile.chooseAvatar}
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {AVATARS.map((seed) => {
              const avatarUrl = `https://api.dicebear.com/9.x/big-ears/svg?seed=${seed}`;
              const isSelected = selectedAvatar === seed;
              return (
                <button
                  key={seed}
                  onClick={() => setSelectedAvatar(seed)}
                  className={`relative rounded-full overflow-hidden border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-indigo-600 scale-110 ring-2 ring-indigo-200"
                      : "border-transparent hover:scale-105 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={avatarUrl}
                    alt={`Avatar ${seed}`}
                    width={80}
                    height={80}
                    className="h-full w-full bg-gray-100 dark:bg-gray-700"
                    unoptimized
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-indigo-600/20 flex items-center justify-center">
                      <span className="text-white font-bold drop-shadow-md">
                        ✓
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.settingsPage.profile.name}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
              {t.settingsPage.profile.email}
            </label>
            <input
              type="text"
              value={user.email || ""}
              disabled
              className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "..." : t.settingsPage.profile.save}
          </button>
        </div>
      </div>
    </div>
  );
}
