import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Prevent caching

// Valid credentials
const VALID_USERNAME = 'pxUser';
const VALID_PASSWORD = '1234';

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Check if credentials are provided
        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        // Check if credentials match the valid ones
        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            return NextResponse.json(
                { 
                    message: 'Login successful',
                    username: username,
                    timestamp: new Date().toISOString()
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }
    } catch (error) {
        // Handle JSON parsing errors or other issues
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}

// Optional: Handle GET requests to show endpoint info
export async function GET() {
    return NextResponse.json({
        message: 'Login endpoint',
        method: 'POST',
        expectedBody: {
            username: 'string',
            password: 'string'
        },
        validCredentials: {
            username: VALID_USERNAME,
            password: VALID_PASSWORD
        },
        responses: {
            200: 'Login successful',
            401: 'Invalid credentials',
            400: 'Bad request'
        }
    });
} 