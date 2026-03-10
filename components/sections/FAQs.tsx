"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import { BlurIn } from "../motion-wrappers";

const FAQs = () => {
  const t = useTranslations("FAQ");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <section className="bg-secondary">
      <div className="container space-y-10 py-14">
        <BlurIn delay={0.3} className="space-y-10">
          <h2 className="text-primary mx-auto text-center text-2xl leading-9 font-bold md:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
        </BlurIn>

        <BlurIn delay={0.3}>
          <div className="mx-auto max-w-3xl">
            <Accordion className="space-y-2">
              {items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card relative overflow-hidden rounded-md border px-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="bg-primary absolute inset-s-0 h-full w-1" />
                  <AccordionTrigger className="[&>svg]:text-primary! text-primary py-4 text-start text-sm font-semibold tracking-tight hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </BlurIn>
      </div>
    </section>
  );
};

export default FAQs;
