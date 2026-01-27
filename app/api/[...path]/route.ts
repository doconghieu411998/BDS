import { NextRequest, NextResponse } from 'next/server';

const REMOTE_SERVER_URL = process.env.REMOTE_SERVER_URL || 'http://103.82.23.181:5000';

async function proxyRequest(request: NextRequest, method: string) {
    try {
        const url = new URL(request.url);
        const apiPath = url.pathname.replace('/api/', '');
        const targetUrl = `${REMOTE_SERVER_URL}/api/${apiPath}${url.search}`;

        // Build headers
        const headers: HeadersInit = {
            'Accept': 'application/json',
        };

        const contentType = request.headers.get('content-type');
        const authorization = request.headers.get('authorization');

        // Only set Content-Type if not multipart (browser handles multipart boundary)
        if (contentType && !contentType.includes('multipart/form-data')) {
            headers['Content-Type'] = contentType;
        } else if (!contentType) {
            headers['Content-Type'] = 'application/json';
        }

        if (authorization) {
            headers['Authorization'] = authorization;
        }

        // Build request options
        const options: RequestInit & { duplex?: string } = {
            method,
            headers,
            signal: AbortSignal.timeout(60000),
            duplex: 'half', // Required for Node.js fetch with body
        };

        // Handle request body for POST/PUT/PATCH
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            if (contentType?.includes('multipart/form-data')) {
                // For multipart, forward the raw body stream
                options.body = request.body;
            } else if (contentType?.includes('application/json')) {
                // For JSON, parse and re-stringify to validate
                const body = await request.json();
                options.body = JSON.stringify(body);
            } else {
                // For other types, forward as-is
                options.body = request.body;
            }
        }

        // Make request to backend
        const response = await fetch(targetUrl, options);

        // Handle error responses
        if (!response.ok) {
            const errorText = await response.text();
            let errorData;

            try {
                errorData = JSON.parse(errorText);
            } catch {
                errorData = { message: errorText || 'Unknown error' };
            }

            return NextResponse.json(
                { success: false, error: errorData },
                { status: response.status }
            );
        }

        // Handle success responses
        const responseContentType = response.headers.get('content-type');

        // Try to parse as JSON if content-type indicates JSON
        if (responseContentType?.includes('application/json')) {
            try {
                const data = await response.json();
                return NextResponse.json(data);
            } catch {
                // If JSON parse fails, return success anyway
                return NextResponse.json({ success: true });
            }
        }

        // For non-JSON responses, try to read as text
        const text = await response.text();
        if (!text || text.trim() === '') {
            return NextResponse.json({ success: true });
        }

        // Try to parse text as JSON, fallback to text message
        try {
            return NextResponse.json(JSON.parse(text));
        } catch {
            return NextResponse.json({ success: true, message: text });
        }

    } catch (error) {
        console.error('Proxy request error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to connect to backend server',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    return proxyRequest(request, 'GET');
}

export async function POST(request: NextRequest) {
    return proxyRequest(request, 'POST');
}

export async function PUT(request: NextRequest) {
    return proxyRequest(request, 'PUT');
}

export async function PATCH(request: NextRequest) {
    return proxyRequest(request, 'PATCH');
}

export async function DELETE(request: NextRequest) {
    return proxyRequest(request, 'DELETE');
}
