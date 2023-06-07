import { NextResponse } from 'next/server';

interface RequestBody {
  content: string;
  episode_id: string;
  access: string;
  currentPage: number;
  pageSize: number;
  maxPageSize: number;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/api/courses/episode/comment/create/?p=${body.currentPage}&page_size=${body.pageSize}&max_page_size=${body.maxPageSize}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${body.access}`,
        },
        body: JSON.stringify(body),
      },
    );
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
