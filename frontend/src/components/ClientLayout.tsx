"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useLocale } from "@/hooks/useLocale";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const { locale } = useLocale();

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
