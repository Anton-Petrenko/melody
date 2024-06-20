import { dbIDFetch, dbRatedSongsFetch, pingDB } from "./DatabaseCalls";
import { NextAuthOptions } from "next-auth";
import Spotify from "next-auth/providers/spotify";

export const authOptions: NextAuthOptions = {
    providers: [
        Spotify({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: "user-read-playback-state streaming playlist-read-private user-follow-read user-top-read user-read-recently-played user-library-read user-read-email"
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
              token.accessToken = account.access_token
              if (token.sub) {
                token.db_id = await dbIDFetch(token.sub);
                token.rated_songs = await dbRatedSongsFetch(token.db_id as number);
                if (!token.db_id && !token.rated_songs) { console.log("ERROR Code 004"); }
              }
              else { 
                console.log("ERROR Code 003"); 
                token.db_id = undefined;
              }
            }
            return token
        },
        async session({ session, token }) {
            session.user = token;
            return session
        },
        async signIn({ user }) {
            await pingDB(user);
            return true
        }
    },
    pages: {
        signIn: '/'
    }
}