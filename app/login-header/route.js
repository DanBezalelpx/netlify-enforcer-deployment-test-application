import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Prevent caching

// Valid credentials
const VALID_USERNAME = 'pxUser';
const VALID_PASSWORD = '1234';

export async function POST(request) {
    try {
        // Get credentials from headers
        const username = request.headers.get('username');
        const password = request.headers.get('password');

        // Check if credentials are provided
        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password headers are required' },
                { status: 400 }
            );
        }

        // Check if credentials match the valid ones
        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            // Return the page content with 200 status
            return new Response(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Login Header Success</title>
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
                                    Welcome to the login-header page!
                                </p>
                                <p class="mt-2 text-sm text-green-600">
                                    Login successful for user: ${username}
                                </p>
                                <p class="mt-1 text-xs text-gray-500">
                                    Authentication method: Headers
                                </p>
                                <p class="mt-1 text-xs text-blue-500">
                                    Endpoint: /login-header
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
        // Handle any errors
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Handle GET requests - return the regular page
export async function GET() {
    return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Login Header Page</title>
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
                            Welcome to the login-header page!
                        </p>
                        <p class="mt-1 text-xs text-blue-500">
                            Endpoint: /login-header
                        </p>
                        <p class="mt-1 text-xs text-gray-500">
                            POST requests require 'username' and 'password' headers
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