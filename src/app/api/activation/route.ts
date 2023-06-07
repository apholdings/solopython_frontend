import { NextResponse } from 'next/server';

interface RequestBody {
  uid: string;
  token: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/users/activation/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.status === 204) {
      return res;
    } else if (!res.ok) {
      // The server responded with an error status code
      return NextResponse.json({ error: 'Server responded with an error' });
    }
  } catch (error) {
    console.error(error); // <-- Add this line
    // There was an error with the network request
    return NextResponse.json({ error: 'There was an error with the network request' });
  }
}
