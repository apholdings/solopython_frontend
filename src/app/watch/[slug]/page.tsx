import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Container from './components/Container';

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  console.log(session);

  // const session = await getServerSession(authOptions);
  // session.user.accessToken = data.access;

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/courses/get/${params?.slug}`);
  const data = await res.json();
  const course = data.results;
  return <Container params={params} course={course} />;
}
