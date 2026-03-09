import { NextIntlClientProvider } from "next-intl";
import { Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import { DirectionProvider } from "@base-ui/react";

// CSS
import "./globals.css";

// i18n
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="scroll-smooth"
    >
      <body className={`${cairo.className} antialiased`}>
        <NextIntlClientProvider>
          <DirectionProvider direction={locale === "ar" ? "rtl" : "ltr"}>
            {children}
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
