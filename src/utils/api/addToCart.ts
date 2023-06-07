export async function addToCart(
  session,
  itemID,
  type,
  coupon,
  shipping,
  quantity,
  size,
  color,
  weight,
  material,
  referrer,
) {
  const body = JSON.stringify({
    itemID,
    type,
    shipping: shipping || '',
    color: color || '',
    size: size || '',
    weight: weight || '',
    material: material || '',
    quantity,
    coupon,
    referrer,
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/cart/add-item/`, {
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
