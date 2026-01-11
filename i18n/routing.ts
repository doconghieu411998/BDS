import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',

  pathnames: {
    '/client': {
      vi: '/greenhill-village-quy-nhon',
      en: '/greenhill-village-quy-nhon',
    },
    '/client/[slug]': {
      vi: '/greenhill-village-quy-nhon/[slug]',
      en: '/greenhill-village-quy-nhon/[slug]'
    }
  }
});