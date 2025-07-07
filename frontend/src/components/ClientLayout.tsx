"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Extract locale from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const potentialLocale = pathSegments[0];
  const isValidLocale =
    potentialLocale && ["en", "ja"].includes(potentialLocale);
  const locale = isValidLocale ? (potentialLocale as "en" | "ja") : "en";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Header locale={locale} />
      {children}
    </>
  );
}
