"use client";

import { cn } from "@/lib/utils";
import {
  ComputerVideoIcon,
  CreditCardValidationIcon,
  TaskEdit02Icon,
  UserCheck01Icon,
  UserGroupIcon,
  UserShield01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { BlurIn, StaggerItem, StaggerList } from "../motion-wrappers";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

import featuresPic from "@/public/features.webp";

const iconsMap = [
  UserGroupIcon,
  ComputerVideoIcon,
  UserCheck01Icon,
  TaskEdit02Icon,
  CreditCardValidationIcon,
  UserShield01Icon,
];

const Features = () => {
  const t = useTranslations("Features");
  const features = t.raw("items") as { title: string; subtitle: string }[];

  return (
    <section>
      <div className="container py-10">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-10 lg:col-span-2">
            <BlurIn delay={0.1}>
              <h2 className="text-brand-dark-blue mx-auto text-2xl leading-9 font-bold md:text-3xl lg:text-4xl">
                {t("title")}
              </h2>
            </BlurIn>

            <StaggerList
              staggerDelay={0.2}
              initialDelay={0.1}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              {features.map((feature, idx) => (
                <StaggerItem key={idx} variant="fadeUp" className="grid">
                  <Card className="group hover:border-brand-light-blue relative rounded-md transition-all duration-300 hover:-translate-y-1">
                    <div className="from-brand-light-blue to-brand-light-blue absolute inset-s-0 top-0 h-full w-1 bg-linear-to-b via-green-600" />
                    <CardContent className="flex items-center gap-2 px-3.5">
                      <div
                        className={cn(
                          "from-brand-light-blue/40 text-brand-light-blue grid w-fit shrink-0 place-items-center self-start rounded-2xl bg-linear-to-tr to-green-500/20 p-2",
                        )}
                      >
                        <HugeiconsIcon
                          icon={iconsMap[idx]}
                          size={32}
                          className="transition-all duration-400 group-hover:rotate-360"
                        />
                      </div>

                      <div>
                        <CardTitle className="text-brand-dark-blue font-bold">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-brand-gray leading-7 font-semibold md:text-base">
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
            delay={0.1}
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
            <div className="to-brand-light-blue/40 absolute inset-0 bg-linear-to-b from-transparent" />
          </BlurIn>
        </div>
      </div>
    </section>
  );
};

export default Features;
