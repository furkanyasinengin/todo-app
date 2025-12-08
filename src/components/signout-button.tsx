"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const route = useRouter();

  const onSignOut = () => {
    Cookies.remove("token");
    route.push("/login");
  };

  return (
    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <button
        className="rounded-full p-2 transition-all duration-200 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        onClick={onSignOut}
      >
        Çıkış Yap
      </button>
    </div>
  );
}
