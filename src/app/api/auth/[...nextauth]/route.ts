import NextAuth from "next-auth"
import Spotify from "next-auth/providers/spotify"

const scope = "user-read-playback-state streaming playlist-read-private user-follow-read user-top-read user-read-recently-played user-library-read user-read-email"

export const authOptions = {
  providers: [
    Spotify ({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
          params: {
              scope: scope,
          }
      },
  })
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, account }){
      if (account) {
        token.accessToken = account.access_token
      }
      // console.log(token.accessToken)
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    }
  }
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }