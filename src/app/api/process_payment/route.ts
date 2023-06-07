import { NextResponse } from 'next/server';

interface PayerIdentification {
  type: string;
  number: string;
}

interface Payer {
  email: string;
  identification: PayerIdentification;
}

interface RequestBody {
  token: string;
  issuer_id: string;
  payment_method_id: string;
  transaction_amount: number;
  installments: number;
  payer: Payer;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  console.log(body);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/payments/mercado_pago/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      // Server responded with an error status code
      return NextResponse.json({ error: 'Server responded with an error' });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    // There was an error with the network request
    return NextResponse.json({ error: 'There was an error with the network request' });
  }
}
