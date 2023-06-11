export async function newsletterSignup(email) {
  const body = JSON.stringify({
    email,
  });

  const res = await fetch(`/api/newsletter/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  });
  const data = await res.json();
  return data;
}
