"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";

export function useLocale() {
  const pathname = usePathname();

  // Extract locale from pathname segments
  const pathSegments = (pathname ?? "").split("/").filter(Boolean);
  const potentialLocale = pathSegments[0];
  const isValidLocale =
    potentialLocale && locales.includes(potentialLocale as Locale);
  const locale: Locale = isValidLocale ? (potentialLocale as Locale) : "en";

  return {
    locale,
    pathname,
    pathSegments,
    isJapanese: locale === "ja",
  };
}
