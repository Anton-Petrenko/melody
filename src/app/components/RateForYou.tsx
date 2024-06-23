import Song from "./Song";
import { spotifyForYou } from "../utils/SpotifyCalls"
import { SpotifyTrack } from "../types/SpotifyTypes";

export default async function RateForYou() {

    let forYou;
    forYou = await spotifyForYou();
    if (!forYou) {
        forYou = {} as SpotifyTrack[];
    }

    return (
        <div className="sm:w-[35rem] w-[95%] h-fit flex flex-col gap-3">
            {
                forYou?.map((song) => (
                    <Song
                        key={song.id + "component"}
                        song={song}
                    />
                ))
            }
        </div>    
    )
}