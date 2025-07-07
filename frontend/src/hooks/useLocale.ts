"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export function useLocale() {
  const pathname = usePathname();

  // Extract locale from pathname segments
  const pathSegments = (pathname ?? "").split("/").filter(Boolean);
  const potentialLocale = pathSegments[0];
  const isValidLocale = potentialLocale && ["en", "ja"].includes(potentialLocale);
  const locale: Locale = isValidLocale ? (potentialLocale as Locale) : "en";

  return {
    locale,
    pathname,
    pathSegments,
    isJapanese: locale === "ja",
  };
}