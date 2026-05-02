import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const ua = request.headers.get('user-agent') || '';

    if (
        ua.includes('facebookexternalhit') ||
        ua.includes('Facebot') ||
        ua.includes('Twitterbot') ||
        ua.includes('Discordbot')
    ) {
        return NextResponse.next();
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/((?!api|_next|robots.txt|sitemap.xml|.*\\.(?:css|js|jpg|jpeg|png|svg|ico|json|mp4)$).*)'
    ]
};