"use client";

import { colorfulCards } from "@/constants";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardTitle } from "../ui/card";
import { BlurIn, StaggerItem, StaggerList } from "../motion-wrappers";

const Journey = () => {
  const t = useTranslations("Journey");
  const steps = t.raw("steps");

  return (
    <section>
      <div className="relative w-full">
        {/* Dashed Bottom Fade Grid */}
        <div
          className="absolute inset-0 z-[-1]"
          style={{
            backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
         repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
      `,
            WebkitMaskImage: `
  repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
      `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />

        <div className="container space-y-6 py-16">
          <BlurIn delay={0.3}>
            <div className="space-y-3">
              <h2 className="text-primary mx-auto text-2xl leading-9 font-bold md:text-3xl lg:text-4xl">
                {t("title")}
              </h2>
              <p className="text-muted-foreground text-lg leading-8">
                {t("description")}
              </p>

              <p className="text-lg leading-8">{t("beforeSteps")}</p>
            </div>
          </BlurIn>

          <StaggerList
            staggerDelay={0.2}
            initialDelay={0.2}
            className="grid gap-4 sm:grid-cols-2 md:grid-cols-4"
          >
            {/* Steps */}
            {steps.map((step: string, idx: number) => (
              <StaggerItem key={idx} variant="fadeUp" className="grid">
                <Card className={cn("", colorfulCards[idx + 2].cardBg)}>
                  <CardContent className="px-3">
                    <span
                      className={cn(
                        "-mt-2 block text-5xl font-black",
                        colorfulCards[idx + 2].iconColor,
                      )}
                    >
                      {idx + 1}
                    </span>
                    <CardTitle
                      className={cn(
                        "mt-1 text-xs font-bold sm:text-sm lg:text-base",
                        colorfulCards[idx + 2].titleColor,
                      )}
                    >
                      {step}
                    </CardTitle>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
            {/* Steps */}
          </StaggerList>
        </div>
      </div>
    </section>
  );
};

export default Journey;
