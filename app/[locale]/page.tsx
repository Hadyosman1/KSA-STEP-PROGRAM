"use client";

import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import Curriculum from "@/components/sections/Curriculum";
import FAQs from "@/components/sections/FAQs";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import LeadForm from "@/components/sections/LeadForm";
import ProblemsAndSolutions from "@/components/sections/ProblemsAndSolutions";
import Statistics from "@/components/sections/Statistics";
import SuccessStory from "@/components/sections/SuccessStory";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="">
      <Header />
      <main>
        <Hero
          badge={t("Hero.badge")}
          title={t("Hero.title")}
          subtitle={t("Hero.description")}
          ctaText={t("Hero.buttons.CTA")}
          secondaryCtaText={t("Hero.buttons.secondary")}
        />
        <Statistics />
        <ProblemsAndSolutions />
        <Curriculum />
        <Journey />
        <LeadForm />
        <Features />
        <SuccessStory />
        <FAQs />
      </main>
      <Footer />
    </div>
  );
}
