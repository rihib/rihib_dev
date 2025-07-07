"use client";

import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const isJapanese = pathname.startsWith("/ja");
    // Normalize path by removing existing locale prefix
    const basePath = pathname.replace(/^\/(?:ja|en)(?=\/|$)/, "") || "/";

    const newPathname = isJapanese ? `/en${basePath}` : `/ja${basePath}`;
    router.push(newPathname);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle language"
    >
      <Globe size={16} />
      <span className="text-sm font-medium">
        {pathname.startsWith("/ja") ? "EN" : "JA"}
      </span>
    </button>
  );
}
