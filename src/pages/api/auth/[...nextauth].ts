import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvidor from 'next-auth/providers/google'
export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvidor({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
})