import { NextRequest, NextResponse } from 'next/server';

const REMOTE_SERVER_URL = process.env.REMOTE_SERVER_URL || 'http://103.82.23.181:5000';

async function proxyRequest(request: NextRequest, method: string) {
    try {
        const { pathname } = new URL(request.url);
        const apiPath = pathname.replace('/api/', '');
        const targetUrl = `${REMOTE_SERVER_URL}/api/${apiPath}`;

        console.log('=== API Proxy Request ===');
        console.log('Method:', method);
        console.log('Path:', apiPath);
        console.log('Target URL:', targetUrl);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        const authorization = request.headers.get('authorization');
        if (authorization) {
            headers['Authorization'] = authorization;
        }

        const options: RequestInit = {
            method,
            headers,
            // Add signal for timeout control
            signal: AbortSignal.timeout(60000), // 60 seconds
        };

        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            const body = await request.json();
            console.log('Request body:', body);
            options.body = JSON.stringify(body);
        }

        console.log('Forwarding to backend...');
        const startTime = Date.now();

        const response = await fetch(targetUrl, options);

        const duration = Date.now() - startTime;
        console.log(`Backend response status: ${response.status} (took ${duration}ms)`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Backend error:', errorText);

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
        console.log('Backend response:', data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('=== Proxy Error ===');
        console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
        console.error('Error message:', error instanceof Error ? error.message : String(error));

        if (error instanceof Error) {
            console.error('Error stack:', error.stack);
        }

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to connect to backend server',
                details: error instanceof Error ? error.message : String(error),
                type: error instanceof Error ? error.constructor.name : 'Unknown'
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
