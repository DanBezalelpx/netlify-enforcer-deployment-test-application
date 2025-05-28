import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Check if credentials match the expected values
    if (username === 'pxUser' && password === '1234') {
      return NextResponse.json(
        { message: 'Login successful', success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Invalid credentials', success: false },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid request body', success: false },
      { status: 400 }
    );
  }
}

// Optional: Handle GET requests to show that the endpoint exists
export async function GET() {
  return NextResponse.json(
    { message: 'Login endpoint is available. Use POST method to authenticate.' },
    { status: 200 }
  );
} 