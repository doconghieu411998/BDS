import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',

  pathnames: {
    '/client': {
      vi: '/the-hera-resort-quy-nhon',
      en: '/the-hera-resort-quy-nhon',
    },
    '/client/[slug]': {
      vi: '/the-hera-resort-quy-nhon/[slug]',
      en: '/the-hera-resort-quy-nhon/[slug]'
    },
    '/client/news': {
      vi: '/the-hera-resort-quy-nhon/tin-tuc',
      en: '/the-hera-resort-quy-nhon/news'
    }
  }
});