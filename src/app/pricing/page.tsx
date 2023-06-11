import Container from './components/Container';

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/tiers/list/`, {
    cache: 'no-store',
  });
  const data = await res.json();
  const tiers = data.results;
  return <Container tiers={tiers} />;
}
