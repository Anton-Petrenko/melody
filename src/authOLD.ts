import argon2 from "argon2"
import { JWT } from "next-auth/jwt"
import Spotify from "next-auth/providers/spotify"
import NextAuth, { Session, User } from "next-auth"
import { SpotifyAPIUser } from "./lib/SpotifyAPITypes"
import Credentials from "next-auth/providers/credentials"
import { AdapterSession, AdapterUser } from "@auth/core/adapters"

interface UpdatedSession {
  token: JWT
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify({
      clientId: process.env.AUTH_SPOTIFY_ID,
      clientSecret: process.env.AUTH_SPOTIFY_SECRET,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: "user-read-playback-state streaming playlist-read-private user-follow-read user-top-read user-read-recently-played user-library-read user-read-email"
        }
      }
    }),
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "email@example.com"
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*******"
        }
      },
      authorize: async (credentials): Promise<User | null> => {
        console.log("Authorizing...")
        if (!credentials.password) {
          console.error("No password was given.")
          return null
        }
        
        let user = null
        // const pw_hash = await argon2.hash(credentials.password as string)
        // console.log(pw_hash)
        user = await {
          id: "1",
          name: "t",
          email: "t",
          image: "t"
        } as User

        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      console.log("JWT...")
      if (account && !token.spotify_id) {
        const res = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            'Authorization': `Bearer ${account.access_token}`
          }
        })
        const data = await res.json() as SpotifyAPIUser
        token.spotify_id = data.id
        token.access_token = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      console.log("Session...")
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
  },
  debug: true
})