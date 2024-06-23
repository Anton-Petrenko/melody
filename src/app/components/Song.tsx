import Image from "next/image";
import { SpotifyTrack } from "../types/SpotifyTypes";
import { MdExplicit } from "react-icons/md";
import PlayButton from "./PlayButton";

export default function Song(
    { song }:
    { song: SpotifyTrack }
) {
    return (
        <div className="w-full flex flex-row gap-2 items-center justify-between">
            <Image
                src={song.album.images.at(0)?.url as string}
                width={song.album.images.at(0)?.width as number}
                height={song.album.images.at(0)?.height as number}
                alt={song.name + ` image`}
                className="w-16 h-16 flex-shrink-0 rounded-lg"
            />
            <div className="flex flex-col justify-center w-full">
                <div className="text-ellipsis line-clamp-1 h-fit">
                    <p>{song.name}</p>
                </div>
                <div className="flex gap-1 h-fit items-center">
                    {song.explicit && <MdExplicit className="opacity-50 flex-shrink-0"/>}
                    <div className="text-ellipsis line-clamp-1 h-fit">
                        <p className="opacity-50">{song.artists.map(artist => artist.name).join(", ")} &#x2022; {song.album.name}</p>
                    </div>
                </div>
            </div>
            <PlayButton
                song={song}
            />
        </div>
    )
}