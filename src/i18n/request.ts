import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  // güvenlik: locale gelmezse fallback
  const safeLocale = locale ?? "en";

  return {
    locale: safeLocale,
    messages: (await import(`./messages/${safeLocale}.json`)).default
  };
});


