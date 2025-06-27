'use client'

import Image from "next/image"
import { useContext } from "react"
import { IoIosStar } from "react-icons/io"
import { FaPause, FaPlay } from "react-icons/fa6"
import { SpotifyTrack } from "@/lib/SpotifyAPITypes"
import { MelodyUserRatings } from "@/lib/MelodyTypes"
import { RaterContext } from "@/providers/RaterProvider"
import { AudioPlayerContext } from "@/providers/AudioPlayerProvider"

const renormalize = (val: number, og_min: number, og_max: number, new_min: number | undefined, new_max: number | undefined): number => {
    if (!new_min || !new_max) return 0
    const numerator = ((val - og_min) * (new_max - new_min))
    const denominator = (og_max - og_min)
    return new_min + (numerator / denominator)
}

const get_rating = (ratings: MelodyUserRatings | null, song: SpotifyTrack): number => {
    if (!ratings) return 0
    for (const key of ["bad", "ok", "good"]) {
        const index = ratings[key].findIndex(id => id === song.id)
        if (index != -1) {
            return (ratings[key].length === 1 ? { "bad": 2.5, "ok": 5, "good": 7.5 }[key] as number : renormalize(index, -1, ratings[key].length, { "bad": 0, "ok": 3.5, "good": 6.5 }[key], { "bad": 3.4, "ok": 6.4, "good": 9.9 }[key]))
        }
    }

    return 0

}

export default function Song({ song, image_size = 64, rate = true, show_rating = true }: { song: SpotifyTrack, image_size?: number, rate?: boolean, show_rating?: boolean }) {

    const rater = useContext(RaterContext);
    const audioPlayer = useContext(AudioPlayerContext);

    let song_rating = 0;
    if (show_rating) {
        song_rating = get_rating(rater.ratings, song);
    }

    return (
        <div className="w-full flex gap-2 items-center relative">
            <div className="relative shrink-0" style={{ width: `${image_size}px`, height: `${image_size}px` }}>
                <Image 
                    src={(song.album && song.album.images.length > 0) ? song.album.images[0].url : "/images/defaultcoverart.png"}
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
                    <p className="opacity-50">{song.artists.map(artist => artist.name).join(", ")} &#x2022; {song.album && song.album.name}</p>
                </div>
            </div>
            <div className="shrink-0 flex">
                {
                    song_rating ? 
                        <div className="flex items-center justify-center px-2 w-[2rem]">
                            <p className="opacity-70 text-lg">{song_rating.toFixed(1)}</p>
                        </div>
                    : (
                        rate &&
                        <div
                            className="rounded-full flex items-center justify-center px-2"
                            onClick={() => {
                                rater.setSong(song)
                                rater.open(true)
                            }}
                        >
                            <IoIosStar
                                color="#6e6e6e"
                                size="20px"
                                className="hover:scale-125 duration-100 hover:fill-[#ecc56b] hover:animate-pulse cursor-pointer"
                            />
                        </div>
                    )
                }
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
                        const res = await fetch(`/api/song/preview/${song.id}`);
                        const data = await res.json() as { preview_link: string };
                        const songToPlay = song
                        songToPlay.preview_url = data.preview_link
                        audioPlayer.play(songToPlay)
                    }}
                    className="w-10 h-10 cursor-pointer rounded-full flex items-center justify-center"
                >
                    {
                        audioPlayer.song ? (
                            audioPlayer.song.id === song.id ? (
                                audioPlayer.playing ?
                                <FaPause color="white" />
                                :
                                <div className="translate-x-[1px]">
                                    <FaPlay color="white" />
                                </div>
                            ) : (
                                <div className="translate-x-[1px]">
                                    <FaPlay color="white" />
                                </div>
                            )
                        ) :
                        <div className="translate-x-[1px]">
                            <FaPlay color="white" />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}