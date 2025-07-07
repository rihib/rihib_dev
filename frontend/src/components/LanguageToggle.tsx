"use client";

import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export default function LanguageToggle() {
  const router = useRouter();
  const { pathSegments, isJapanese } = useLocale();

  const toggleLanguage = () => {
    // Get path without locale
    const basePath = "/" + pathSegments.slice(1).join("/");
    const normalizedBasePath = basePath === "/" ? "" : basePath;

    const newPathname = isJapanese ? `/en${normalizedBasePath}` : `/ja${normalizedBasePath}`;
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
        {isJapanese ? "EN" : "JA"}
      </span>
    </button>
  );
}
