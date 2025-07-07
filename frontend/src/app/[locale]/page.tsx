import HomePage from "@/components/HomePage";
import { notFound } from "next/navigation";

export default function LocalePage({ params }: { params: { locale: string } }) {
  const { locale } = params;

  if (!["en", "ja"].includes(locale)) {
    notFound();
  }

  return <HomePage locale={locale as "en" | "ja"} />;
}
