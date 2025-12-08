import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
    database: new Pool({connectionString: process.env.DATABASE_URL}),
    socialProviders: {
        spotify: {
            clientId: process.env.AUTH_SPOTIFY_ID as string,
            clientSecret: process.env.AUTH_SPOTIFY_SECRET as string,
            scope: [
                "user-read-recently-played",
                "user-top-read"
            ]
        }
    },
})