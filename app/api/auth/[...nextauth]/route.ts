import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "missing_client_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "missing_client_secret",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // We can expose the sub ID if needed
        // (session.user as any).id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_development_secret_only",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
