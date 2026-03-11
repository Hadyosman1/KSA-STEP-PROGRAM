"use client";

import { useLocale, useTranslations } from "next-intl";
import { BlurIn } from "../motion-wrappers";

import avatar1 from "@/public/avatars/man-2.png";
import avatar2 from "@/public/avatars/man-3.png";
import avatar3 from "@/public/avatars/man-4.png";
import avatar4 from "@/public/avatars/man-5.png";
import avatar5 from "@/public/avatars/man-6.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";

const testimonials = [
  {
    name: { ar: "فهد العنزي", en: "Fahad Al-Anzi" },
    testimonial: {
      ar: "الحمد لله، بعد البرنامج قدرت أحسن درجتي في القدرات بشكل كبير وما توقعت النتيجة تكون كذا.",
      en: "Thanks to the program, I managed to significantly improve my Qudrat score. I didn't expect it to be this good.",
    },
    avatar: avatar1,
  },
  {
    name: { ar: "محمد الغامدي", en: "Mohammed Al-Ghamdi" },
    testimonial: {
      ar: "المدربين جداً محترفين وشرحهم واضح، حسّيت بالفرق من أول أسبوع.",
      en: "The instructors are very professional and their explanations are clear. I felt the difference from the first week.",
    },
    avatar: avatar2,
  },
  {
    name: { ar: "سعيد الحربي", en: "Saeed Al-Harbi" },
    testimonial: {
      ar: "البرنامج مرتب خطوة بخطوة، صار عندي خطة واضحة وأقدر أذاكر بدون تشتت.",
      en: "The program is well-organized step by step. I now have a clear plan and can study without getting distracted.",
    },
    avatar: avatar3,
  },
  {
    name: { ar: "عبدالله الشمري", en: "Abdullah Al-Shammari" },
    testimonial: {
      ar: "الاختبارات المحاكاة حسستني بثقة يوم الاختبار الحقيقي، جداً أنصح فيه.",
      en: "The mock tests gave me confidence on the real exam day. I highly recommend it.",
    },
    avatar: avatar4,
  },
  {
    name: { ar: "نواف السبيعي", en: "Nawaf Al-Subaie" },
    testimonial: {
      ar: "متابعتي مع المستشار التعليمي كانت ممتازة، ساعدني أركز على نقاط ضعفي وزادت درجتي.",
      en: "My guidance with the educational advisor was excellent. He helped me focus on my weak points and boosted my score.",
    },
    avatar: avatar5,
  },
];

const SuccessStory = () => {
  const t = useTranslations("SuccessStory");
  const locale = useLocale();

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <section className="bg-secondary/30">
      <div className="container space-y-10 py-14">
        <BlurIn delay={0.1} className="space-y-7">
          <h2 className="text-primary mx-auto text-center text-2xl leading-9 font-bold md:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-center text-lg font-semibold md:text-lg lg:text-xl">
            {t("subtitle")}
          </p>
        </BlurIn>
        <BlurIn delay={0.1} className="">
          <Carousel
            dir={dir}
            className="mx-auto w-[calc(100%-4.5rem)] sm:max-w-3xl"
            opts={{
              direction: dir,
            }}
          >
            <CarouselContent>
              {testimonials.map((t, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="border">
                      <CardContent className="flex flex-col items-center justify-center gap-6 p-6">
                        <Image
                          src={t.avatar}
                          alt={`Avatar - ${index + 1}`}
                          width={100}
                          height={100}
                          className="rounded-full shadow-2xl select-none"
                        />
                        <CardTitle className="text-center font-bold select-none">
                          {locale === "ar" ? t.name.ar : t.name.en}
                        </CardTitle>
                        <CardDescription className="text-center font-bold italic select-none sm:text-base">
                          {'"'}{" "}
                          {locale === "ar"
                            ? t.testimonial.ar
                            : t.testimonial.en}{" "}
                          {'"'}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </BlurIn>
      </div>
    </section>
  );
};

export default SuccessStory;
