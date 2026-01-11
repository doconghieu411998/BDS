import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    matcher: '/((?!api|_next|.*\\.(?:css|js|jpg|jpeg|png|svg|ico|json)$).*)'
}