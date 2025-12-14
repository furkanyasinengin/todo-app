"use client";

import { useLanguage } from "@/context/language-context";
import ProfileSettings from "@/components/settings/profile-settings";
import SecuritySettings from "@/components/settings/security-settings";
import DangerZone from "@/components/settings/danger-zone";

interface SettingsClientProps {
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

export default function SettingsClient({ user }: SettingsClientProps) {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {t.settingsPage.title}
        </h1>
        <p className="text-muted-foreground mt-1 text-gray-500 dark:text-gray-400">
          {t.settingsPage.desc}
        </p>
      </div>

      <ProfileSettings user={user} />

      <SecuritySettings />

      <DangerZone />
    </div>
  );
}
