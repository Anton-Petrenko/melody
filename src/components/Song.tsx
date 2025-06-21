'use client'

import Image from "next/image"
import { useContext } from "react"
import { SpotifyTrack } from "@/lib/SpotifyAPITypes"
import { AudioPlayerContext } from "@/providers/AudioPlayerProvider"
import { FaPause, FaPlay } from "react-icons/fa6"

export default function Song({ song }: { song: SpotifyTrack }) {

    const audioPlayer = useContext(AudioPlayerContext);

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
            <div className="shrink-0">
                <div
                    onClick={async () => {

                        if (audioPlayer.song && audioPlayer.song.id === song.id && audioPlayer.playing) {
                            audioPlayer.pause() 
                            return
                        }
                        if (audioPlayer.song && audioPlayer.song.id === song.id && !audioPlayer.playing) {
                            audioPlayer.resume() 
                            return
                        }

                        if (audioPlayer.song && audioPlayer.song.id === song.id) return
                        const res = await fetch(`/api/song/${song.id}`);
                        const data = await res.json() as { preview_link: string };
                        const songToPlay = song
                        songToPlay.preview_url = data.preview_link
                        audioPlayer.play(songToPlay)
                    }}
                    className="w-10 h-10 cursor-pointer bg-[#eeeeee] rounded-full flex items-center justify-center"
                >
                    {
                        audioPlayer.song ? (
                            audioPlayer.song.id === song.id ? (
                                audioPlayer.playing ?
                                <FaPause color="#212121" />
                                :
                                <div className="translate-x-[1px]">
                                    <FaPlay color="#212121" />
                                </div>
                            ) : (
                                <div className="translate-x-[1px]">
                                    <FaPlay color="#212121" />
                                </div>
                            )
                        ) :
                        <div className="translate-x-[1px]">
                            <FaPlay color="#212121" />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}