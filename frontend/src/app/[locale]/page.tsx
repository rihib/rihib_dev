import HomePage from "@/components/HomePage";
import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n";

export default function LocalePage({ params }: { params: { locale: string } }) {
  const { locale } = params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  return <HomePage locale={locale as "en" | "ja"} />;
}
