"use client";

import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { BlurIn } from "../motion-wrappers";

const AnimatedCounter = ({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 2000; // 2 seconds

      const animateValue = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentValue = progress * value;
        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animateValue);
        }
      };

      requestAnimationFrame(animateValue);
    }
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className="bg-primary/10 grid aspect-square w-20 place-items-center rounded-full p-2"
    >
      {Math.round(displayValue)}
      {suffix}
    </span>
  );
};

const Statistics = () => {
  const t = useTranslations("Statistics");
  const items = t.raw("items") as Array<{
    value: { num: number; suffix: string };
    label: string;
  }>;

  return (
    <section>
      <div className="container space-y-10 py-16">
        <BlurIn delay={0.2}>
          <h2 className="mx-auto text-primary text-center text-2xl leading-9 font-bold md:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
        </BlurIn>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item, idx) => (
            <motion.div
              key={`${item.value}-${idx}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative rounded-md shadow-2xl transition-transform duration-200 hover:translate-y-1">
                <div className="bg-primary absolute inset-s-0 top-0 h-full w-1.5" />
                <CardContent className="flex items-center gap-1">
                  <CardTitle className="text-primary mb-2 font-bold md:text-lg">
                    <AnimatedCounter
                      value={item.value.num}
                      suffix={item.value.suffix}
                    />
                  </CardTitle>
                  <CardDescription className="text-base font-semibold md:text-lg">
                    {item.label}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
