export async function CheckCoupon(name: string, course_id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/api/coupons/check/?name=${name}&course=${course_id}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await res.json();
  return data;
}
