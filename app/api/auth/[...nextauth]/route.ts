import User from '@models/user';
import { connectToDB } from '@utils/database';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user?.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ user }) {
      try {
        if (!user) {
          return false;
        }

        await connectToDB();

        const userExists = await User.findOne({
          email: user.email,
        });

        if (!userExists) {
          await User.create({
            email: user.email,
            username: user.name?.replace(' ', '').toLowerCase(),
            image: user.image,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
