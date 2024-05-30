'use server';

import { MelodyUser, Post, Track, User } from "../types/types";
import { sql, QueryResult, db } from "@vercel/postgres";
import { getProfile, getSongByID } from "./SpotifyAPICalls";

export async function syncLoginWithDB(user: User | null = null) {
    // this can probably be morphed into one sql query
    const givenUser = user ? true : false;
    const userSpotifyProfile = user ? user : await getProfile() as User;
    if (userSpotifyProfile.id) {
        const { rows, fields } = (await sql`SELECT * FROM users WHERE api_id=${userSpotifyProfile.id};`) as QueryResult;
        if (rows.length > 0) {
            const { rows, fields } =  await sql`UPDATE users SET last_logged = CURRENT_TIMESTAMP WHERE api_id=${userSpotifyProfile.id} RETURNING db_id;` as QueryResult;
            return rows.at(0).db_id
        } else {
            if (givenUser) {
                const { rows, fields } = await sql`INSERT INTO users (api_id, last_logged, photo) VALUES (${userSpotifyProfile.id}, CURRENT_TIMESTAMP, ${userSpotifyProfile.image}) RETURNING db_id;` as QueryResult;
                const dbID = rows.at(0).db_id;
                await sql`UPDATE users SET display_name=${userSpotifyProfile.id}, handle_name=${`rater` + dbID} WHERE db_id=${dbID};`
                await sql`INSERT INTO followers (user_id, following, followers) VALUES (${rows.at(0).db_id}, ARRAY[${rows.at(0).db_id}::INTEGER], ARRAY[${rows.at(0).db_id}::INTEGER]);`
                return dbID
            } else {
                const { rows, fields } = await sql`INSERT INTO users (api_id, last_logged, photo,) VALUES (${userSpotifyProfile.id}, CURRENT_TIMESTAMP, ${userSpotifyProfile.images.at(0)?.url}) RETURNING db_id;` as QueryResult;
                const dbID = rows.at(0).db_id;
                await sql`UPDATE users SET display_name=${userSpotifyProfile.id}, handle_name=${`rater` + dbID} WHERE db_id=${dbID};`
                await sql`INSERT INTO followers (user_id, following, followers) VALUES (${rows.at(0).db_id}, ARRAY[${rows.at(0).db_id}::INTEGER], ARRAY[${rows.at(0).db_id}::INTEGER]);`
                return dbID
            }
        }
    }
    return null;
}

export async function getUserDBID(user: User | null = null) {
    const userSpotifyProfile = user ? user : await getProfile() as User;
    if (userSpotifyProfile.id) {
        const { rows, fields } = await sql`SELECT * FROM users WHERE api_id=${userSpotifyProfile.id};` as QueryResult;
        return rows.at(0) as MelodyUser
    } else {
        return null
    }
}

export async function getRatedSongs() {
    const dbID = await getUserDBID();
    if (dbID) {
        const { rows, fields } = (await sql`SELECT rankings FROM song_rankings WHERE user_db_id=${dbID.db_id};`) as QueryResult;
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
    await sql`INSERT INTO posts (user_id, date, type, content, song_id, rating_pos, rating_score) VALUES (${dbID}, CURRENT_TIMESTAMP, 'rating', ${content}, ${songID}, ${position}, ${rating});`;
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

export async function getUserDBInfo(id: number) {
    const { rows } = await sql`
    SELECT users.db_id, users.api_id, users.date_created, users.last_logged, users.photo, followers.following, followers.followers, users.display_name, users.handle_name, song_rankings.rankings
    FROM users 
    INNER JOIN followers 
    ON users.db_id = followers.user_id 
    LEFT JOIN song_rankings
    ON song_rankings.user_db_id = users.db_id
    WHERE users.db_id = ${id};` as QueryResult;
    if (rows.at(0)) {
        return rows.at(0) as MelodyUser
    } else {
        return null
    }
}