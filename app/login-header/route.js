import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Prevent caching

// Valid credentials
const VALID_USERNAME = 'pxUser';
const VALID_PASSWORD = '1234';

export async function POST(request) {
    try {
        let username, password;
        const contentType = request.headers.get('content-type') || '';

        // Parse request body based on content type
        if (contentType.includes('application/json')) {
            // Handle JSON data
            const body = await request.json();
            username = body.username;
            password = body.password;
        } else if (contentType.includes('application/x-www-form-urlencoded')) {
            // Handle form-urlencoded data
            const formData = await request.formData();
            username = formData.get('username');
            password = formData.get('password');
        } else {
            // Try to parse as form data if no content-type is specified
            try {
                const formData = await request.formData();
                username = formData.get('username');
                password = formData.get('password');
            } catch {
                // If form data parsing fails, try JSON
                const body = await request.json();
                username = body.username;
                password = body.password;
            }
        }

        // Check if credentials are provided
        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
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
                                    Content-Type: ${contentType || 'not specified'}
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
        // Handle parsing errors or other issues
        return NextResponse.json(
            { error: 'Invalid request body or unsupported content type' },
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