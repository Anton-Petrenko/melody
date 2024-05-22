import Image from "next/image";
import { useContext } from "react";
import PlayButton from "./PlayButton";
import { Track } from "../types/types";
import { RatingContext } from "../providers/RatingProvider";

export default function TrackCardRating(
    {
        track,
        serveNew,
        higher
    }:
    {
        track: Track,
        serveNew: (higher: boolean) => Promise<void>,
        higher: boolean
    }
) {

    const ratingContext = useContext(RatingContext);

    return (
        <>
            <div className="w-[90%] sm:w-full h-[5rem] sm:h-[6rem] bg-[#29292e] hover:scale-[1.05] hover:bg-[#384e32] rounded-xl flex flex-row p-4 gap-4 justify-between cursor-pointer duration-75 ease-in relative">
                <Image
                    src={track.album.images.at(0)?.url as string}
                    alt={`${track.name} cover`}
                    width={track.album.images.at(0)?.width as number}
                    height={track.album.images.at(0)?.height as number}
                    className="h-[3rem] w-[3rem] sm:h-[4rem] sm:w-[4rem] rounded-lg"
                />
                <div className="flex flex-col text-left w-full relative">
                    <p className="opacity-50 line-clamp-1 text-ellipsis sm:text-sm text-xs">{track.artists.map(artist => artist.name).join(", ")}</p>
                    <b className="line-clamp-1 text-ellipsis sm:line-clamp-2 text-sm sm:text-medium">{track.name}</b>
                </div>
                <div className="w-[3rem] flex h-full justify-center items-center">
                    <PlayButton
                        track={track}
                    />
                </div>
                <div className="absolute top-0 left-0 sm:w-[88%] w-[80%] h-full" onClick={() => serveNew(higher)}></div>
            </div>
        </>
    )
}