import {
  Calendar02Icon,
  LibraryIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import heroPic from "@/public/hero-cover.webp";

interface Props {
  badge: string;
  title: string;
  subtitle: string;
  features: string[];
  ctaText: string;
  secondaryCtaText: string;
}

const Hero = ({
  badge,
  title,
  subtitle,
  features,
  ctaText,
  secondaryCtaText,
}: Props) => {
  return (
    <section className="relative grid min-h-[80vh] py-24">
      <Image
        src={heroPic}
        alt="Cover"
        placeholder="blur"
        priority
        fill
        sizes="100vw"
        className="z-[-2] object-cover"
      />
      <div className="absolute inset-0 z-[-1] bg-linear-to-t from-emerald-800 via-emerald-900 to-emerald-950 opacity-60" />
      <div className="container grid items-center">
        <div>
          <div className="text-background mx-auto max-w-4xl text-center text-balance">
            <Badge className="bg-primary/20 outline-primary mx-auto mb-4 flex h-auto px-4 py-1 text-sm leading-9 outline-2 md:text-base">
              {badge}
            </Badge>
            <h1 className="mb-6 text-3xl leading-12 font-bold md:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="text-lg leading-9 font-semibold md:text-xl">
              {subtitle}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <Button
              size={"lg"}
              className={
                "h-12 max-w-64 grow rounded-full text-lg font-semibold"
              }
            >
              {ctaText}
              <HugeiconsIcon icon={Calendar02Icon} className="size-6" />
            </Button>
            <Button
              variant="secondary"
              size={"lg"}
              className={
                "h-12 max-w-64 grow rounded-full text-lg font-semibold"
              }
            >
              {secondaryCtaText}
              <HugeiconsIcon icon={LibraryIcon} className="size-6" />
            </Button>
          </div>

          <div className="mx-auto mt-8 w-fit">
            <ul className="mx-auto flex flex-wrap items-center justify-center gap-2">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="text-background flex items-center gap-0.25 text-xs md:text-sm lg:text-base"
                >
                  <HugeiconsIcon
                    icon={Tick02Icon}
                    size="24"
                    className="text-green-400"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
