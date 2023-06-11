import { NextResponse } from 'next/server';

interface RequestBody {
  email: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/users/reset_password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      // El servidor respondió con un código de estado de error
      return NextResponse.json({ error: 'Server responded with an error' });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    // Hubo un error con la solicitud de red
    return NextResponse.json({ error: 'There was an error with the network request' });
  }
}
