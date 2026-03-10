"use client";

import { cn } from "@/lib/utils";
import {
  BookOpenTextIcon,
  ChartAnalysisIcon,
  MathIcon,
  NoteDoneIcon,
  PencilEdit01Icon,
  TimeManagementIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import { BlurIn, StaggerItem, StaggerList } from "../motion-wrappers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const itemsIconsMap = [
  MathIcon,
  ChartAnalysisIcon,
  BookOpenTextIcon,
  PencilEdit01Icon,
  TimeManagementIcon,
  NoteDoneIcon,
];

const Curriculum = () => {
  const t = useTranslations("Curriculum");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="curriculum">
      <div className="container space-y-10 py-16">
        <BlurIn delay={0.3} className="space-y-10">
          <h2 className="text-primary mx-auto text-center text-2xl leading-9 font-bold md:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-center text-lg font-semibold md:text-lg lg:text-xl">
            {t("description")}
          </p>
        </BlurIn>

        <StaggerList
          staggerDelay={0.3}
          initialDelay={0.2}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          {items.map((item, idx) => (
            <StaggerItem key={idx} variant="fadeUp" className="grid">
              <Card className="group relative transition-all duration-200 hover:-translate-1">
                <div className="bg-primary absolute bottom-0 left-0 h-1 w-full" />
                <CardContent>
                  <CardHeader className="mb-3">
                    <div
                      className={cn(
                        "bg-secondary text-primary mx-auto mb-2 grid w-fit place-items-center rounded-2xl p-2",
                      )}
                    >
                      <HugeiconsIcon
                        icon={itemsIconsMap[idx]}
                        size={40}
                        className="transition-all duration-400 group-hover:rotate-360"
                      />
                    </div>
                    <CardTitle className="text-center font-bold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardDescription className="text-center leading-7 font-semibold md:text-base">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
};

export default Curriculum;
