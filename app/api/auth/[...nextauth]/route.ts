import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import type { Session, User } from "next-auth";

export const authOptions = {  // ← was authLogin
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, user }: { session: Session; user: User }) => {
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
  pages: { signIn: '/login' },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
