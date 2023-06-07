export async function fetchCartTotal(items) {
  const body = JSON.stringify({
    items,
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/cart/get-total/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  });
  const data = await res.json();
  return data.results;
}
