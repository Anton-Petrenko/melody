"use server"

import { User } from "../types/types";
import { getAuthSession } from "./GetSession";

const spotifyAPI = async (url: string, session: any) => {

    if(!session){
        return null;
    }

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
        }
    }).then((res) => res.json())

    return res;
}

export const getProfilePhoto = async () => {
    const getUser = (await getProfile()) as User;
    let image_url;
    try {
        image_url = (getUser.images.at(0)?.url) as string;
    }
    catch {
        image_url = "";
    }
    return image_url
}

export const searchSpotify = async (search: string) => {
    const session = await getAuthSession();
    const searchURL = String(`https://api.spotify.com/v1/search?q=${search}&type=track`);
    return spotifyAPI(searchURL, session);
}

export const getProfile = async () => {
    const session = await getAuthSession();
    console.log(session);
    return spotifyAPI("https://api.spotify.com/v1/me", session);
}

export const getSongByID = async (id: string) => {
    const session = await getAuthSession();
    return spotifyAPI(`https://api.spotify.com/v1/tracks/${id}`, session);
}