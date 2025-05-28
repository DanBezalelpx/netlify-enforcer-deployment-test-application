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
        console.log('Received credentials:', { username, password });
        console.log('if result:', username === VALID_USERNAME && password === VALID_PASSWORD)
        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            console.log('Login successful for user:', username);
            // Return the page content with 200 status
            return new Response(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Login Success</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body>
                    <div class="min-h-screen flex items-center justify-center bg-gray-50">
                        <div class="max-w-md w-full space-y-8">
                            <div class="text-center">
                                <h1 class="text-4xl font-bold text-gray-900">
                                    Hello World
                                </h1>
                                <p class="mt-4 text-lg text-gray-600">
                                    Welcome to the login page!
                                </p>
                                <p class="mt-2 text-sm text-green-600">
                                    Login successful for user: ${username}
                                </p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `, {
                status: 200,
                headers: {
                    'Content-Type': 'text/html',
                },
            });
        } else {
            return NextResponse.json(
                { error: 'Unauthorized' },
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

// Handle GET requests - return the regular page
export async function GET() {
    return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Login Page</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="min-h-screen flex items-center justify-center bg-gray-50">
                <div class="max-w-md w-full space-y-8">
                    <div class="text-center">
                        <h1 class="text-4xl font-bold text-gray-900">
                            Hello World
                        </h1>
                        <p class="mt-4 text-lg text-gray-600">
                            Welcome to the login page!
                        </p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `, {
        status: 200,
        headers: {
            'Content-Type': 'text/html',
        },
    });
} 