"use client"
import usePageView from "@/hook/use-page-view";
import Main from "./main";
import { DEFAULT_VIEW_EXPIRATION_MS, SESSION_KEYS } from "@/constants/help";
import { useLocale } from "next-intl";
export default function HomePage() {

  usePageView({
    pageId: SESSION_KEYS.PAGE_VIEWS,
    locale: useLocale(),
    expirationMs: DEFAULT_VIEW_EXPIRATION_MS
  });
  
  return (
    <>
      <Main />
    </>
  );
}
