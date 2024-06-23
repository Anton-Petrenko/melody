"use server"

import { getAuthSession } from "./GetSession";
import { MelodySession } from "../types/AppTypes";
import { SpotifyPlayHistoryObject, SpotifyTrack } from "../types/SpotifyTypes";

/** The function to call a Spotify API endpoint */
const spotifyAPI = async (url: string, session: MelodySession | undefined = undefined) => {

    if(!session) {
        session = await getAuthSession() as MelodySession;
        if (!session) {
            return null;
        }
    }

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session.user?.accessToken}`,
        }
    }).then((res) => res.json())

    return res;
    
}

/** An optimized call to get the For You songs list for a user */
export async function spotifyForYou() {

    // Session assertion
    const session = await getAuthSession() as MelodySession;
    if (!session) {
        console.log("ERROR Code 007");
        return undefined
    }

    // API Calls
    const longTerm = await spotifyGetTopTracksLongTerm(session);
    const mediumTerm = await spotifyGetTopTracksMediumTerm(session);
    const shortTerm = await spotifyGetTopTracksShortTerm(session);
    const recents = await spotifyGetRecentlyPlayedTracks(session);

    // Formatting & removing duplicate songs across the calls
    let recentlyPlayed;
    try {recentlyPlayed = recents.map((value) => value.track) as SpotifyTrack[];}
    catch {console.log("ERROR Code 009"); return undefined}
    const merged = [...longTerm, ...mediumTerm, ...shortTerm, ...recentlyPlayed];
    const uniqueIDs = Array.from(new Set(merged.map((value) => value.id)));
    let forYou = [] as SpotifyTrack[];
    merged.forEach(track => {
        const index = uniqueIDs.indexOf(track.id)
        if (index != -1) {
            uniqueIDs.splice(index, 1);
            forYou.push(track)
        }
    });

    return forYou.sort((a, b) => a.duration_ms - b.duration_ms)
}

export async function spotifyGetTopTracksLongTerm(session: MelodySession | undefined = undefined) {
    return await spotifyAPI("https://api.spotify.com/v1/me/top/tracks?time_range=long_term", session).then((res) => res.items) as SpotifyTrack[];
}

export async function spotifyGetTopTracksMediumTerm(session: MelodySession | undefined = undefined) {
    return await spotifyAPI("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term", session).then((res) => res.items) as SpotifyTrack[];
}

export async function spotifyGetTopTracksShortTerm(session: MelodySession | undefined = undefined) {
    return await spotifyAPI("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", session).then((res) => res.items) as SpotifyTrack[];
}

export async function spotifyGetRecentlyPlayedTracks(session: MelodySession | undefined = undefined) {
    return await spotifyAPI("https://api.spotify.com/v1/me/player/recently-played", session).then((res) => res.items) as SpotifyPlayHistoryObject[];
}