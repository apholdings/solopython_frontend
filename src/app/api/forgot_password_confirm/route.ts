import { NextResponse } from 'next/server';

interface RequestBody {
  uid: any;
  token: any;
  new_password: any;
  re_new_password: any;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/users/reset_password_confirm/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    if (res.status === 204) {
      return NextResponse.json(res.json());
    }

    // Handle other error cases
    const errorData = await res.json();
    return NextResponse.json(errorData);
  } catch (error) {
    // There was an error with the network request
    return NextResponse.json(
      { error: 'There was an error with the network request' },
      { status: 500 },
    );
  }
}
