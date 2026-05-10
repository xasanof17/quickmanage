import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Mock users — replace with a real DB lookup later
const USERS = [
  { id: "1", name: "Sodik Shadiev", email: "admin@quickmanage.com", password: "password123", role: "admin" },
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email:    { label: "Email",    type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ email, password }) {
        const user = USERS.find(
          (u) => u.email === email && u.password === password
        );
        if (!user) return null;
        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as typeof USERS[0]).role;
      return token;
    },
    session({ session, token }) {
      if (session.user) (session.user as { role?: string }).role = token.role as string;
      return session;
    },
  },
});
