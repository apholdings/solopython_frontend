export async function removeFromCart(session, itemID, type) {
  const body = JSON.stringify({
    itemID,
    type,
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/cart/remove-item/`, {
    method: 'POST',
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
