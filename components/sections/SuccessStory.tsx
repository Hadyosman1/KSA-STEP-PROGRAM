"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { BlurIn } from "../motion-wrappers";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

// Men avatars
import avatar1 from "@/public/avatars/man-2.png";
import avatar2 from "@/public/avatars/man-3.png";
// import avatar3 from "@/public/avatars/man-4.png";
// import avatar4 from "@/public/avatars/man-5.png";
// import avatar5 from "@/public/avatars/man-6.png";
// import avatar6 from "@/public/avatars/man-7.png";

// Women avatars
import womAvatar2 from "@/public/avatars/women-avatars/avatar-2.png";
import womAvatar3 from "@/public/avatars/women-avatars/avatar-3.png";
import womAvatar4 from "@/public/avatars/women-avatars/avatar-4.png";
import womAvatar1 from "@/public/avatars/women-avatars/avatar.png";

const testimonials = [
  {
    name: { ar: "عبدالمجيد الابراهيم", en: "Abdulmajeed Al-Ibrahim" },
    testimonial: {
      ar: "دروس خصوصية عن طريق تطبيق زوم باسعار ممتازة .. وقدرت اختار الوقت اللي يناسبني يعطيكم العافية",
      en: "Private lessons via Zoom at great prices. I was able to choose the time that suits me. Much appreciated!",
    },
    avatar: avatar1,
  },
  {
    name: { ar: "هدى النويصر", en: "Huda Al-Nuwair" },
    testimonial: {
      ar: "الاكاديمية ممتازه اولادي في متوسط الشرح رهيب المعلمة عندها طولة بال تعيد وتزيد وماتمشي عن الصفحة الا وهم فاهمين كلمة شكر ماتوفي حقهم",
      en: "The academy is excellent. My kids are in middle school and the explanation is amazing. The teacher is very patient, repeats as needed, and makes sure they fully understand before moving on. Words can’t thank them enough.",
    },
    avatar: womAvatar1,
  },
  {
    name: { ar: "ام وسام مغربي", en: "Umm Wisam Maghrabi" },
    testimonial: {
      ar: "مررره جميل شرح وتوصيل المعلومة ولا اروع الله يسعد كل من اجتهد في هذه المنصة",
      en: "The explanation and delivery are absolutely رائع. May God bless everyone who worked hard on this platform.",
    },
    avatar: womAvatar2,
  },
  {
    name: { ar: "مني الحربي", en: "Mona Al-Harbi" },
    testimonial: {
      ar: "ممتاز جدا الشرح واستفدت كثير متعاونين ومجهودهم واضح يعطيهم العافية",
      en: "The explanation is excellent. I benefited a lot. They’re very cooperative and their effort is clearly noticeable. Much appreciated.",
    },
    avatar: womAvatar3,
  },
  {
    name: { ar: "محمد الغامدي", en: "Mohammed Al-Ghamdi" },
    testimonial: {
      ar: "صراحة كانت دورة ممتازة جدا جدا واستفدت منها كثير وتعلمت منها الطريقة الصحيحة للحل ما ندمت يوم دخلت الدورة ❤️❤️",
      en: "Honestly, it was an excellent course. I benefited a lot and learned the correct way to solve problems. I don’t regret joining it at all ❤️❤️",
    },
    avatar: avatar2,
  },
  {
    name: { ar: "الطالبة لمياء", en: "Student Lamia" },
    testimonial: {
      ar: "اوجه شكر لمنصة طريق العلم علي تعاونهم معي ومرونة عمل الجدول جدا متعاونين وخدومين جدا انصح فيهم 🧡",
      en: "I would like to thank Elm Way for their support and flexible scheduling. They are very helpful and cooperative. Highly recommended 🧡",
    },
    avatar: womAvatar4,
  },
];

const SuccessStory = () => {
  const t = useTranslations("SuccessStory");
  const locale = useLocale();

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <section className="">
      <div className="container space-y-10 py-10">
        <BlurIn delay={0.1} className="space-y-3">
          <h2 className="text-brand-green mx-auto text-center text-2xl leading-9 font-bold md:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="text-brand-gray mx-auto max-w-2xl text-center text-lg font-semibold md:text-lg lg:text-xl">
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
                    <Card className="border-brand-green bg-brand-gray/3 border-2">
                      <CardContent className="flex flex-col items-center justify-center gap-5 p-6">
                        <Image
                          src={t.avatar}
                          alt={`Avatar - ${index + 1}`}
                          width={100}
                          height={100}
                          className="rounded-full shadow-2xl select-none"
                        />
                        <CardTitle className="text-brand-green text-center font-bold select-none">
                          {locale === "ar" ? t.name.ar : t.name.en}
                        </CardTitle>
                        <CardDescription className="text-brand-gray text-center font-bold italic select-none sm:text-base">
                          {'"'}
                          {locale === "ar"
                            ? t.testimonial.ar
                            : t.testimonial.en}
                          {'"'}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              variant={"secondary"}
              className={"border-brand-green"}
            />
            <CarouselNext
              variant={"secondary"}
              className={"border-brand-green"}
            />
          </Carousel>
        </BlurIn>
      </div>
    </section>
  );
};

export default SuccessStory;
