import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const ua = request.headers.get('user-agent') || '';
    const isBot = ua.includes('facebookexternalhit') || 
                  ua.includes('Facebot') || 
                  ua.includes('Twitterbot') || 
                  ua.includes('Discordbot') ||
                  ua.includes('meta-externalagent');
    
    const { pathname } = request.nextUrl;

    // Nếu là Bot truy cập trang chủ, thực hiện rewrite sang /vi để trả về 200 OK luôn
    if (isBot && pathname === '/') {
        const url = request.nextUrl.clone();
        url.pathname = '/vi';
        return NextResponse.rewrite(url);
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/((?!api|_next|robots.txt|sitemap.xml|.*\\.(?:css|js|jpg|jpeg|png|svg|ico|json|mp4)$).*)'
    ]
};