"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function TodoFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string, type: "search" | "priority") => {
    const params = new URLSearchParams(searchParams);

    if (term && term !== "ALL") {
      params.set(type, term);
    } else {
      params.delete(type);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const inputClass =
    "block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors";

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700">
      <div className="relative flex-1">
        <label htmlFor="search" className="sr-only">
          Görev Ara
        </label>
        <input
          type="text"
          id="search"
          className={inputClass}
          placeholder="Görev başlığında ara..."
          defaultValue={searchParams.get("search")?.toString()}
          onChange={(e) => handleSearch(e.target.value, "search")}
        />
      </div>
      <div className="w-full md:w-48">
        <label htmlFor="priority-filter" className="sr-only">
          Öncelik Filtrele
        </label>
        <select
          id="priority-filter"
          defaultValue={searchParams.get("priority")?.toString() || "ALL"}
          onChange={(e) => handleSearch(e.target.value, "priority")}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-colors cursor-pointer"
        >
          <option value="ALL">Tüm Öncelikler</option>
          <option value="LOW">Düşük (Low)</option>
          <option value="MEDIUM">Orta (Medium)</option>
          <option value="HIGH">Yüksek (High)</option>
        </select>
      </div>
    </div>
  );
}
