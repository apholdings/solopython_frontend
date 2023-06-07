export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/courses/w/:path*'],
};
