"use client";

import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const pathSegments = (pathname ?? "").split("/").filter(Boolean);
    const currentLocale = pathSegments[0];
    const isJapanese = currentLocale === "ja";
    
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
        {(pathname ?? "").split("/").filter(Boolean)[0] === "ja" ? "EN" : "JA"}
      </span>
    </button>
  );
}
