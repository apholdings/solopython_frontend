import Button from '@/components/Button';
import Featured from './components/Featured';
import FeaturedMore from './components/FeaturedMore';
import Recommended from './components/Recommended';
import BlogSearch from './components/BlogSearch';
import EmailCTA from './components/EmailCTA';
import Header from './components/Header';
import Container from './components/Container';

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/blog/posts/list/`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  const posts = data.results;

  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/api/category/list/parent/?p=1&page_size=20&max_page_size=100`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const categoriesData = await categoriesRes.json();
  const categories = categoriesData.results;

  return (
    <Container>
      <Header />
      <Featured />
      <div className="mx-auto max-w-7xl text-center">
        <div className="w-full border-b border-gray-200 my-12" />
      </div>
      <FeaturedMore />
      <Recommended />
      <EmailCTA />
      <BlogSearch posts={posts} categories={categories} />
    </Container>
  );
}
