import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      banner: string;
      role: string;
      verified: boolean;
      accessToken: string;
      refreshToken: string;
      address: string;
    };
  }
}
