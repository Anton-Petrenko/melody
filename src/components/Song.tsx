'use server'

import Image from "next/image"
import PlayButton from "./ButtonPlay"
import { SpotifyTrack } from "@/lib/SpotifyAPITypes"

export default async function Song({ song }: { song: SpotifyTrack }) {
    return (
        <div className="w-full flex gap-2 items-center relative">
            <div className="w-16 h-16 relative shrink-0">
                <Image 
                    src={song.album.images.length > 0 ? song.album.images[0].url : "/images/defaultcoverart.png"}
                    alt={`${song.name} by ${song.artists.map((artist) => artist.name).join(", ")}`}
                    fill={true}
                    className="rounded-lg"
                />
            </div>
            <div className="flex flex-col w-full">
                <div className="text-ellipsis line-clamp-1">
                    <p>{song.name}</p>
                </div>
                <div className="text-ellipsis line-clamp-1">
                    <p className="opacity-50">{song.artists.map(artist => artist.name).join(", ")} &#x2022; {song.album.name}</p>
                </div>
            </div>
            <div className="border shrink-0">
                <PlayButton/>
            </div>
        </div>
    )
}