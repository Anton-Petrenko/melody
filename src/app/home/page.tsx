import Homepage from "../components/home/homepage";
import { getAuthSession } from "../utils/server";
import { getTopTracks, getTopArtists } from "../api/apiCalls";
import { Track, Artist } from "../types/types";

export default async function Home() {

    const session = await getAuthSession();
    const topTracks = (await getTopTracks(session).then((data) => data.items)) as Track[];
    const topArtists = (await getTopArtists(session).then((data) => data.items)) as Artist[];

    return (
        <div>
            <Homepage topTracks={topTracks} topArtists={topArtists}></Homepage>
        </div>
    )
}