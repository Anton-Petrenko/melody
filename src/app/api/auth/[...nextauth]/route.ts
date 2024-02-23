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

  }
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }