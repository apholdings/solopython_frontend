export async function fetchCartItems(session) {
  const cartItemsRes = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/cart/cart-items/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `JWT ${session?.user.accessToken}`,
    },
  });
  const data = await cartItemsRes.json();
  return data.results;
}
