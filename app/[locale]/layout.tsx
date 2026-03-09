import { DirectionProvider } from "@base-ui/react";
import { Messages, NextIntlClientProvider } from "next-intl";
import { Cairo } from "next/font/google";
import { notFound } from "next/navigation";

// CSS
import "./globals.css";

// i18n
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`))
    .default as Messages;

  return {
    title: messages.Metadata.title,
    description: messages.Metadata.description,
  };
}

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

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="scroll-smooth"
    >
      <body className={`${cairo.className} antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <DirectionProvider direction={locale === "ar" ? "rtl" : "ltr"}>
            {children}
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
