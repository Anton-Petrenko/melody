'use server';

import { Track, User } from "../types/types";
import { getProfile } from "./SpotifyAPICalls";
import { sql, QueryResult } from "@vercel/postgres";

export async function syncLoginWithDB() {
    // this can probably be morphed into one sql query
    const userSpotifyProfile = await getProfile() as User;
    if (userSpotifyProfile.id) {
        const { rows, fields } = (await sql`SELECT * FROM users WHERE api_id=${userSpotifyProfile.id};`) as QueryResult;
        if (rows.at(0)) {
            await sql`UPDATE users SET last_logged = ${new Date().toISOString()} WHERE api_id=${userSpotifyProfile.id};`
        } else {
            await sql`INSERT INTO users (api_id, last_logged) VALUES (${userSpotifyProfile.id}, ${new Date().toISOString()});`
        }
    }

}

export async function getUserDBID() {
    const userSpotifyProfile = await getProfile() as User;
    if (userSpotifyProfile.id) {
        const { rows, fields } = (await sql`SELECT * FROM users WHERE api_id=${userSpotifyProfile.id};`) as QueryResult;
        return rows.at(0).db_id
    } else {
        return null
    }
}

export async function getRatedSongs() {
    const dbID = await getUserDBID();
    if (dbID) {
        const { rows, fields } = (await sql`SELECT rankings FROM song_rankings WHERE user_db_id=${dbID};`) as QueryResult;
        if (rows.at(0)) {
            return rows.at(0).rankings
        }
        else {
            return [] as string[]
        }
    } else {
        return [] as string[]
    }
}

export async function addSong(song: Track, dbID: number) {
    await sql`INSERT INTO song_rankings (user_db_id, rankings) VALUES (${dbID}, ARRAY[${song.id}]);`;
}

export async function addSongAtIndex(song: Track, dbID: number, index: number) {
    await sql`UPDATE song_rankings SET rankings = rankings[:${index}]||${song.id}::text||rankings[${index+1}:] WHERE user_db_id = ${dbID};`;
}