import { signOut } from "next-auth/react";
import { getAuthSession } from "../utils/server";
import { redirect } from "next/navigation";
import { getTopItems } from "../api/getTopTracks";

export default async function Feed(){

    const session = await getAuthSession();

    if(!session) {
        redirect("/");
    }

    const topTracks = (await getTopItems(session).then((data) => data.items));

    return (
        <>
            {topTracks.map((track: any) => (
                <p key={track.name}>{track.name}</p>
            ))}
        </>
    )
}