import type { Metadata } from "next";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata = {
  title: "Todo App | Dashboard",
  description: "Advanced Todo Application",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-muted/40">
      <aside className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-14 items-center justify-center border-b font-bold">
          LOGO
        </div>
        <nav className="flex-1 p-4">
          <ul>
            <li className="mb-2 p-2 rounded cursor-pointer transition-all hover:bg-gray-200 dark:hover:bg-gray-800 hover:pl-3">
              Ana Sayfa
            </li>
            <li className="mb-2 p-2 rounded cursor-pointer transition-all hover:bg-gray-200 dark:hover:bg-gray-800 hover:pl-3">
              Görevler
            </li>
            <li className="p-2 p-2 rounded cursor-pointer transition-all hover:bg-gray-200 dark:hover:bg-gray-800 hover:pl-3">
              Ayarlar
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-6 justify-between">
          <div className="font-semibold text-foreground">
            Hoşgeldin, Kullanıcı
          </div>
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
