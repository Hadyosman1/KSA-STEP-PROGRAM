"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import featuresPic from "@/public/features.webp";
import {
  ComputerVideoIcon,
  CreditCardValidationIcon,
  LaptopVideoIcon,
  UserCheck01Icon,
  UserGroupIcon,
  UserShield01Icon,
} from "@hugeicons/core-free-icons";
import { BlurIn, StaggerItem, StaggerList } from "../motion-wrappers";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";

const iconsMap = [
  LaptopVideoIcon,
  ComputerVideoIcon,
  UserCheck01Icon,
  UserGroupIcon,
  CreditCardValidationIcon,
  UserShield01Icon,
];

const Features = () => {
  const t = useTranslations("Features");
  const features = t.raw("items") as { title: string; subtitle: string }[];

  return (
    <section>
      <div className="container py-16">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-10 lg:col-span-2">
            <BlurIn delay={0.2}>
              <h2 className="text-primary mx-auto text-2xl leading-9 font-bold md:text-3xl lg:text-4xl">
                {t("title")}
              </h2>
            </BlurIn>

            <StaggerList
              staggerDelay={0.3}
              initialDelay={0.2}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              {features.map((feature, idx) => (
                <StaggerItem key={idx} variant="fadeUp" className="grid">
                  <Card className="group hover:border-primary relative rounded-md border transition-all duration-300 hover:-translate-y-1">
                    <div className="bg-primary/50 absolute -inset-e-5 -top-5 size-15 rounded-full" />
                    <CardContent className="flex items-center gap-2 px-3.5">
                      <div
                        className={cn(
                          "bg-secondary text-primary grid w-fit shrink-0 place-items-center self-start rounded-2xl p-2",
                        )}
                      >
                        <HugeiconsIcon
                          icon={iconsMap[idx]}
                          size={32}
                          className="transition-all duration-400 group-hover:rotate-360"
                        />
                      </div>

                      <div>
                        <CardTitle className="text-primary font-bold">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="leading-7 font-semibold md:text-base">
                          {feature.subtitle}
                        </CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerList>
          </div>

          <BlurIn
            delay={0.2}
            className="group relative overflow-hidden rounded-2xl max-lg:hidden"
          >
            <Image
              src={featuresPic}
              width={640}
              height={960}
              placeholder="blur"
              alt="Features"
              className="w-full shadow-2xl transition-all duration-300 group-hover:scale-115 group-hover:rotate-5"
            />
            <div className="to-primary/40 absolute inset-0 bg-linear-to-b from-transparent" />
          </BlurIn>
        </div>
      </div>
    </section>
  );
};

export default Features;
