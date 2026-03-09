import Header from "@/components/header/Header";
import Curriculum from "@/components/sections/Curriculum";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import ProblemsAndSolutions from "@/components/sections/ProblemsAndSolutions";
import Statistics from "@/components/sections/Statistics";
import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage() {
  const t = await getTranslations();

  return (
    <div className="">
      <Header />
      <main>
        <Hero
          badge={t("Hero.badge")}
          title={t("Hero.title")}
          subtitle={t("Hero.description")}
          features={t.raw("Hero.features")}
          ctaText={t("Hero.buttons.CTA")}
          secondaryCtaText={t("Hero.buttons.secondary")}
        />
        <Statistics />
        <hr className="container" />
        <ProblemsAndSolutions />
        <hr className="container" />
        <Curriculum />
        <hr className="container" />
        <Journey />
      </main>
    </div>
  );
}
