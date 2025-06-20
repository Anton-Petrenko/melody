import { JWT } from "next-auth/jwt"
import NextAuth, { Session } from "next-auth"
import Spotify from "next-auth/providers/spotify"
import { AdapterSession, AdapterUser } from "@auth/core/adapters"

interface UpdatedSession {
  token: JWT
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [
    Spotify({
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: "user-read-playback-state streaming playlist-read-private user-follow-read user-top-read user-read-recently-played user-library-read user-read-email"
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      const newSession = session as { user: AdapterUser; } & AdapterSession & Session & UpdatedSession
      newSession.token = token
      return newSession
    }
  },
  pages: {
    signIn: '/',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  }
})