import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale: providedLocale }) => {
  const locale = providedLocale || "ar";
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
