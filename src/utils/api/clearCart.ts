export async function fetchClearCart(session) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/cart/clear/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `JWT ${session?.user.accessToken}`,
    },
  });
  const data = await res.json();
  return data.results;
}
