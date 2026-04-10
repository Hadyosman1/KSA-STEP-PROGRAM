import { Toaster } from "@/components/ui/sonner";
import WhatsAppFloatedButton from "@/components/WhatsAppFloatedButton";
import { DirectionProvider } from "@base-ui/react";
import { Messages, NextIntlClientProvider } from "next-intl";
import { Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";

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
      className="scroll-pt-(--header-height) scroll-smooth"
    >
      <head>
        {/* 1. GTM Script */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TQPSN2TH');`,
          }}
        />
      </head>
      <body className={`${cairo.className} antialiased`}>
        {/* 2. GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TQPSN2TH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <NextIntlClientProvider messages={messages} locale={locale}>
          <DirectionProvider direction={locale === "ar" ? "rtl" : "ltr"}>
            {children}
            <Toaster duration={4000} richColors position="top-center" />
            <WhatsAppFloatedButton />
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
