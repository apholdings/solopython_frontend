import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email@domain.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          throw new Error(`Error on /api/login: ${res.statusText}`);
        }

        const { access, refresh } = await res.json();

        const userRes = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/users/me/`, {
          headers: { Authorization: `JWT ${access}` },
        });

        if (!userRes.ok) {
          throw new Error(`Error on /auth/users/me/: ${userRes.statusText}`);
        }

        const userData = await userRes.json();

        const walletRes = await fetch(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/api/users/wallet/me/`,
          {
            headers: { Authorization: `JWT ${access}` },
          },
        );

        if (!walletRes.ok) {
          throw new Error(`Error on /auth/users/wallet/me/: ${userRes.statusText}`);
        }

        const walletData = await walletRes.json();
        const user = {
          id: userData.id,
          email: userData.email,
          name: userData.username,
          image: userData.picture,
          role: userData.role,
          verified: userData.verified,
          accessToken: access,
          refreshToken: refresh,
          address: walletData.results.address,
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }

      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};

export const GET = NextAuth(authOptions as any);
export const POST = NextAuth(authOptions as any);
