import { User } from "../OLDtypes/types";
import { NextAuthOptions } from "next-auth";
import Spotify from "next-auth/providers/spotify";
import { syncLoginWithDB } from "./DatabaseCalls";

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
            }
            return token
        },
        async session({ session, token }) {
            session.user = token
            return session
        },
        async signIn({ user, account, profile, email, credentials }) {
            await syncLoginWithDB(user as User);
            return true
        }
    },
    pages: {
        signIn: '/'
    }
}