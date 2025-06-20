import Image from "next/image"
import { SpotifyTrack } from "@/lib/SpotifyAPITypes"

export default function Song({ song }: { song: SpotifyTrack }) {
    return (
        <div className="w-full flex gap-2 items-center">
            <div className="w-16 h-16 relative shrink-0">
                <Image 
                    src={song.album.images.length > 0 ? song.album.images[0].url : "/images/defaultcoverart.png"}
                    alt={`${song.name} by ${song.artists.map((artist) => artist.name).join(", ")}`}
                    fill={true}
                    className="rounded-lg"
                />
            </div>
            <div className="flex flex-col">
                <div className="text-ellipsis line-clamp-1">
                    <p>{song.name}</p>
                </div>
                <div className="text-ellipsis line-clamp-1">
                    <p className="opacity-50">{song.artists.map(artist => artist.name).join(", ")} &#x2022; {song.album.name}</p>
                </div>
            </div>
        </div>
    )
}