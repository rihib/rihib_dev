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
  const isJapanese = pathname.startsWith("/ja");
  const locale = isJapanese ? "ja" : "en";

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
