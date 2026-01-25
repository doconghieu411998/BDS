import { NextRequest, NextResponse } from 'next/server';

const REMOTE_SERVER_URL = process.env.REMOTE_SERVER_URL;

async function proxyRequest(request: NextRequest, method: string) {
    try {
        const { pathname } = new URL(request.url);
        const apiPath = pathname.replace('/api/', '');
        const targetUrl = `${REMOTE_SERVER_URL}/api/${apiPath}`;

        const headers: HeadersInit = {
            'Accept': 'application/json',
        };

        const contentType = request.headers.get('content-type');
        if (contentType) {
            headers['Content-Type'] = contentType;
        } else {
            headers['Content-Type'] = 'application/json';
        }

        const authorization = request.headers.get('authorization');
        if (authorization) {
            headers['Authorization'] = authorization;
        }

        const options: RequestInit = {
            method,
            headers,
            // @ts-ignore - Required for streaming bodies in some environments
            duplex: 'half',
            signal: AbortSignal.timeout(60000),
        };

        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            if (contentType?.includes('multipart/form-data')) {
                options.body = request.body;
            } else {
                // For JSON, we can either forward body or parse/stringify.
                // Existing logic parsed it, implying potential validation or just habit. 
                // To be safe and minimal change:
                if (contentType?.includes('application/json')) {
                    const body = await request.json();
                    options.body = JSON.stringify(body);
                } else {
                    // Fallback for other types (e.g. text/plain), just pass body
                    options.body = request.body;
                }
            }
        }

        const response = await fetch(targetUrl, options);

        if (!response.ok) {
            const errorText = await response.text();

            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch {
                errorData = { message: errorText };
            }

            return NextResponse.json(
                { success: false, error: errorData },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
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
