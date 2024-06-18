'use server'

import { sql } from "@vercel/postgres";
import { User as NextAuthUser } from "next-auth";
import { getAuthSession } from "../OLDutils/GetSession";

/**
 * A function responsible for performing a handshake with the database during login by doing the following:
 * 
 * 1. Create and initialize a database presence for any new users logging in
 * 2. Make sure existing users can ping the database and update their activity
 * 
 * Each user falls into one of these two criteria. If either is not met, an authentication error is returned.
 * 
 * @param user the NextAuth user object returned by the signIn callback function
 * @returns a boolean representing whether the database ping was successful
 */
export async function pingDB(user: NextAuthUser): Promise<boolean> {
    const session = await getAuthSession();
    console.log(JSON.stringify(session));
    if (user.id) {

        // Check if user exists
        const { rows } = await sql`
            SELECT db_id
            FROM users
            WHERE api_id = ${user.id};
        `;

        if (rows.length > 0) {

            // If user exists, update status
            await sql`
                UPDATE users 
                SET last_active = CURRENT_TIMESTAMP
                WHERE api_id=${user.id};
            `
            return true;


        } else {

            // If user does not exist, create the user in the database
            const { rows } = await sql`
                INSERT INTO users (api_id, created, last_active, photo_url, display_name, handle)
                VALUES (${user.id}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ${user.image}, ${user.name}, 'temp')
                RETURNING db_id;
            `;
            if (!rows.at(0)) { console.log("ERROR 002"); return false; }
            const dbID = rows[0].db_id;
            await sql`
                UPDATE users
                SET handle      = ${`rater` + dbID},
                    followers   = ARRAY[${dbID}::INTEGER],
                    following   = ARRAY[${dbID}::INTEGER]
                WHERE db_id = ${dbID};
            `;
            return true;

        }

    } else {
        console.log("ERROR Code 001");
        return false
    }
}

/**
 * This function is used in the authentication login calls to store the database id of the user on the client
 * @param api_id
 * @returns the database ID of the user on login OR undefined
 */
export async function dbIDFetch(api_id: string): Promise<string | undefined> {
    const { rows } = await sql`
        SELECT db_id
        FROM users
        WHERE api_id = ${api_id};
    `;
    return rows.at(0)?.db_id as string
}

/**
 * This function is used in the authentication login calls to store the rated songs of the user on the client
 * @param id 
 * @returns the users rated songs as an array OR undefined
 */
export async function dbRatedSongsFetch(id: number): Promise<string[] | undefined> {
    const { rows } = await sql`
        SELECT rankings
        FROM users
        WHERE db_id = ${id};
    `;
    if (rows.length > 0) { return rows.at(0)?.rankings; }
    else { return undefined; }
}