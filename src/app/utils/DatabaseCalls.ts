'use server';

import { Post, Track, User, UserInfo } from "../types/types";
import { sql, QueryResult } from "@vercel/postgres";
import { getProfile } from "./SpotifyAPICalls";
import { redirect } from "next/navigation";

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
    if (userSpotifyProfile) {
        const { rows, fields } = await sql`SELECT db_id FROM users WHERE api_id=${userSpotifyProfile.id};` as QueryResult;
        return rows.at(0).db_id as number
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

export async function getPosts(numPosts: number = 20, offset: number = 0) {
    const dbID = await getUserDBID();
    if (dbID) {
        const { rows }: { rows: Post[]} = await sql`SELECT p.*, u.photo, u.api_id
        FROM posts p
        JOIN followers f ON p.user_id = ANY(f.following)
        JOIN users u ON p.user_id = u.db_id
        WHERE f.user_id = ${dbID}
        ORDER BY p.date DESC
        LIMIT ${numPosts}
        OFFSET ${offset};` as QueryResult;
        return rows as Post[];
    } else {
        redirect("/");
    }
}

export async function getUserDBInfo(id: number) {
    const { rows } = await sql`
    SELECT users.db_id, users.api_id, users.date_created, users.last_logged, users.photo, followers.following, followers.followers, users.display_name, users.handle_name, song_rankings.rankings, users.liked, users.hated
    FROM users 
    INNER JOIN followers 
    ON users.db_id = followers.user_id 
    LEFT JOIN song_rankings
    ON song_rankings.user_db_id = users.db_id
    WHERE users.db_id = ${id};` as QueryResult;
    if (rows.at(0)) {
        return rows.at(0) as UserInfo
    } else {
        return null
    }
}

export async function likePostDB(postID: number, userID: number) {
    await sql`
    UPDATE users 
    SET liked = 
    CASE 
        WHEN array_position(liked, ${postID}) IS NULL 
        THEN array_append(liked, ${postID})
        ELSE liked 
    END 
    WHERE db_id = ${userID};`
    await sql`
    UPDATE posts 
    SET likes = likes + 1 
    WHERE post_id = ${postID} AND array_position((SELECT liked FROM users WHERE db_id = ${userID}), ${postID}) IS NOT NULL;`
}

export async function unlikePostDB(postID: number, userID: number) {
    await sql`
    UPDATE posts 
    SET likes = likes - 1 
    WHERE post_id = ${postID} AND array_position((SELECT liked FROM users WHERE db_id = ${userID}), ${postID}) IS NOT NULL;`
    await sql`
    UPDATE users 
    SET liked = array_remove(liked, ${postID}) 
    WHERE db_id = ${userID};`
}

export async function hatePostDB(postID: number, userID: number) {
    await sql`
    UPDATE users 
    SET hated = 
    CASE
        WHEN array_position(hated, ${postID}) IS NULL
        THEN array_append(hated, ${postID})
        ELSE hated
    END
    WHERE db_id = ${userID};`
    await sql`
    UPDATE posts 
    SET hates = hates + 1 
    WHERE post_id = ${postID} AND array_position((SELECT hated FROM users WHERE db_id = ${userID}), ${postID}) IS NOT NULL;`
}

export async function unhatePostDB(postID: number, userID: number) {
    await sql`
    UPDATE posts 
    SET hates = hates - 1 
    WHERE post_id = ${postID} AND array_position((SELECT hated FROM users WHERE db_id = ${userID}), ${postID}) IS NOT NULL;`
    await sql`
    UPDATE users 
    SET hated = array_remove(hated, ${postID}) 
    WHERE db_id = ${userID};`
}

export async function followDB(source: number, target: number) {
    await sql`
    UPDATE followers 
    SET following = 
    CASE
        WHEN array_position(following, ${target}) IS NULL
        THEN array_append(following, ${target})
        ELSE following
    END
    WHERE user_id = ${source};`
    await sql`
    UPDATE followers
    SET followers =
    CASE
        WHEN array_position(followers, ${source}) IS NULL
        THEN array_append(followers, ${source})
        ELSE followers
    END
    WHERE user_id = ${target};`
}

export async function unfollowDB(source: number, target: number) {
    await sql`
    UPDATE followers
    SET following = array_remove(following, ${target})
    WHERE user_id = ${source};`
    await sql`
    UPDATE followers
    SET followers = array_remove(followers, ${source})
    WHERE user_id = ${target};`
}

export async function getPost(postID: number) {
    const { rows } = await sql`
    SELECT p.*, u.photo, u.api_id
    FROM posts p
    JOIN users u ON p.user_id = u.db_id
    WHERE post_id = ${postID};` as QueryResult;
    return rows.at(0) as Post;
}