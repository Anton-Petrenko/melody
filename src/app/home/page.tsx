import { signOut } from "next-auth/react";
import { getAuthSession } from "../utils/server";
import { redirect } from "next/navigation";
import { getTopItems, getProfile } from "../api/apiCalls";
import { Track } from "../types/types";

export default async function Feed(){

    try {
        const session = await getAuthSession();
    
        if(!session) {
            redirect("/");
        }
    
        const topTracks = (await getTopItems(session).then((data) => data.items)) as Track[];
    
        return (
            <>
                {/* {topTracks.map((track) => (
                    <p key={track.id}>{track.name} by {track.artists.map((artist) => <i key={artist.id}>{artist.name}, </i>)}</p>
                ))} */}
            </>
        )
    }
    catch(e) {
        redirect("/");
    }

}