"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Aktif linki boyamak için
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SignOutButton } from "@/components/signout-button";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/context/language-context";
import Image from "next/image";

interface DashboardShellProps {
  children: React.ReactNode;
  user: { name: string | null; email: string | null; image: string | null };
}

export default function DashboardShell({
  children,
  user,
}: DashboardShellProps) {
  const { t } = useLanguage();
  const pathname = usePathname();

  const userImageSeed = user.image || "Felix";
  const avatarUrl = `https://api.dicebear.com/9.x/big-ears/svg?seed=${userImageSeed}`;

  const isActive = (path: string) => pathname === path;

  const linkClass = (path: string) => `
    flex items-center p-2 rounded transition-colors font-medium
    ${
      isActive(path)
        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
        : "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
    }
  `;

  return (
    <div className="flex h-screen w-full bg-muted/40">
      <aside className="hidden w-48 flex-col border-r bg-background md:flex">
        <div className="flex h-20 items-center justify-center border-b font-bold">
          <Link href="/dashboard">
            <Image
              src="/logo.png"
              alt="TodoApp Logo"
              width={60}
              height={60}
              priority
              className="object-contain"
            />
          </Link>
        </div>
        <nav className="flex-1 p-2">
          <ul>
            <li className="mb-1 p-1 rounded cursor-pointer transition-all hover:bg-gray-200 dark:hover:bg-gray-800 hover:pl-3">
              <Link href="/dashboard" className={linkClass("/dashboard")}>
                {t.dashboard.home}
              </Link>
            </li>
            <li className="p-1 p-1 rounded cursor-pointer transition-all hover:bg-gray-200 dark:hover:bg-gray-800 hover:pl-3">
              <Link
                href="/dashboard/settings"
                className={linkClass("/dashboard/settings")}
              >
                {t.dashboard.settings}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-20 items-center gap-4 border-b bg-background px-6 justify-between">
          <div className="flex items-center gap-3 font-semibold text-foreground">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
              <Image
                src={avatarUrl}
                alt="Avatar"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              {t.dashboard.welcome},{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                {user.name || user.email}
              </span>
            </div>
          </div>
          <div className="flex flex-column items-center right-4 top-4 gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <SignOutButton />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
