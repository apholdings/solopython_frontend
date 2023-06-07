export async function synchCart(session, items) {
  const body = JSON.stringify({
    items,
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/cart/synch/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `JWT ${session?.user.accessToken}`,
    },
    body,
  });
  const data = await res.json();
  return data.results;
}
