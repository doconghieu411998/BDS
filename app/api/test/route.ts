import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    console.log('=== TEST API ROUTE CALLED ===');
    return NextResponse.json({ message: 'API route is working!', timestamp: new Date().toISOString() });
}

export async function POST(request: NextRequest) {
    console.log('=== TEST POST API ROUTE CALLED ===');
    const body = await request.json();
    console.log('Request body:', body);
    return NextResponse.json({
        message: 'POST received!',
        receivedData: body,
        timestamp: new Date().toISOString()
    });
}
