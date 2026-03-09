import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

const Statistics = async () => {
  const t = await getTranslations("Statistics");
  const items = t.raw("items") as Array<{ value: string; label: string }>;

  return (
    <section>
      <div className="container space-y-10 py-16">
        <h2 className="mx-auto text-center text-2xl leading-9 font-bold md:text-3xl lg:text-4xl">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item, idx) => (
            <Card
              className="shadow-2xl transition-transform duration-200 hover:translate-y-1"
              key={`${item.value}-${idx}`}
            >
              <CardContent className="flex items-center gap-1">
                <CardTitle className="text-primary mb-2 font-bold md:text-lg">
                  <span className="bg-primary/10 grid aspect-square w-20 place-items-center rounded-full p-2">
                    {item.value}
                  </span>
                </CardTitle>
                <CardDescription className="text-base font-semibold md:text-lg">
                  {item.label}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
