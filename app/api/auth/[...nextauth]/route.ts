import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        const userInfo:{email:string, password:string} = {
          email: credentials.email,
          password: credentials.password,
        };
        try {
          const { data } = await axios(`${process.env.NEXTAUTH_URL}/api/user`, {
            params: userInfo,
          });
          if (data) {
            return data;
          }
        } catch (err) {
          console.error("Error in user login", err);
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
