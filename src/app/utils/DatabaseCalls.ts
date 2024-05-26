'use server';

import { Post, Track, User } from "../types/types";
import { sql, QueryResult, db } from "@vercel/postgres";
import { getProfile, getSongByID } from "./SpotifyAPICalls";

export async function syncLoginWithDB() {
    // this can probably be morphed into one sql query
    try {
        const userSpotifyProfile = await getProfile() as User;
        if (userSpotifyProfile.id) {
            const { rows, fields } = (await sql`SELECT * FROM users WHERE api_id=${userSpotifyProfile.id};`) as QueryResult;
            if (rows.at(0)) {
                await sql`UPDATE users SET last_logged = ${new Date().toISOString()} WHERE api_id=${userSpotifyProfile.id};`
            } else {
                const { rows, fields } = await sql`INSERT INTO users (api_id, last_logged, photo) VALUES (${userSpotifyProfile.id}, ${new Date().toISOString()}, ${userSpotifyProfile.images.at(0)?.url}) RETURNING db_id;` as QueryResult;
                await sql`INSERT INTO followers (user_id, following) VALUES (${rows.at(0).db_id}, ARRAY[${rows.at(0).db_id}::INTEGER]);`
            }
        }
        return "SUCCESS";
    } catch {
        return "ERROR";
    }
}

export async function getUserDBID(user: User | null = null) {
    var userSpotifyProfile;
    if (user == null) {
        userSpotifyProfile = await getProfile() as User;
    }
    else {
        userSpotifyProfile = user;
    }
    if (userSpotifyProfile.id) {
        const { rows, fields } = await sql`SELECT * FROM users WHERE api_id=${userSpotifyProfile.id};` as QueryResult;
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

export async function uploadRatingPostToDB(dbID: number, songID: string, content: string, position: number, rating: string) {
    await sql`INSERT INTO posts (user_id, date, type, content, song_id, rating_pos, rating_score) VALUES (${dbID}, ${new Date().toISOString()}, 'rating', ${content}, ${songID}, ${position}, ${rating});`;
}

export async function getPosts(dbID: number, numPosts: number = 20, offset: number = 0) {
    var idToTrack = {} as any;
    const { rows }: { rows: Post[]} = await sql`SELECT p.*, u.photo, u.api_id
    FROM posts p
    JOIN followers f ON p.user_id = ANY(f.following)
    JOIN users u ON p.user_id = u.db_id
    WHERE f.user_id = ${dbID}
    ORDER BY p.date DESC
    LIMIT ${numPosts}
    OFFSET ${offset};` as QueryResult;
    return rows;
}