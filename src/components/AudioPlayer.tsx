'use client'

import Image from "next/image";
import { useContext } from "react";
import { Slider } from "@heroui/react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { AudioPlayerContext } from "@/providers/AudioPlayerProvider";

export default function AudioPlayer() {

    const audioPlayer = useContext(AudioPlayerContext);

    return (
        <div className="fixed bottom-0 bg-background w-full h-16 flex items-center">
            <div className="sm:mx-auto flex items-center gap-8 mx-6">
                <div 
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer shrink-0" 
                    onClick={() => {
                        if (audioPlayer.playing) audioPlayer.pause()
                        else audioPlayer.resume()
                    }}
                >
                    {
                        audioPlayer.playing ?
                        <FaPause color="#212121" />
                        :
                        <div className="translate-x-[1px]">
                            <FaPlay color="#212121" />
                        </div>
                    }
                </div>
                <div className="w-[20rem] sm:flex hidden">
                    {
                        audioPlayer.song && audioPlayer.duration &&
                        <Slider
                            size="sm"
                            color="foreground"
                            hideThumb
                            minValue={0}
                            maxValue={Math.round(audioPlayer.duration)}
                            value={Math.round(audioPlayer.playback_time)}
                            startContent={<p className="text-sm">0:{Math.round(audioPlayer.playback_time).toString().padStart(2, "0")}</p>}
                            endContent={<p className="text-sm">0:{Math.round(audioPlayer.duration)}</p>}
                            onChangeEnd={(value) => {
                                if (Array.isArray(value)) return
                                audioPlayer.skip_to(value)
                            }}
                        />
                    }
                </div>
                {
                    audioPlayer.song &&
                    <div className="flex gap-2 shrink-0">
                        <div className="w-8 h-8 relative">
                            <Image
                                src={audioPlayer.song.album.images.length > 0 ? audioPlayer.song.album.images[0].url : "/images/defaultcoverart.png"}
                                alt={`${audioPlayer.song.name} by ${audioPlayer.song.artists.map((artist) => artist.name).join(", ")}`}
                                fill={true}
                                className="rounded-sm"
                            />
                        </div>
                        <div className="flex flex-col text-xs justify-center shrink-0">
                            <p className="font-bold">{audioPlayer.song.name}</p>
                            <p className="opacity-50">{audioPlayer.song.artists.map(artist => artist.name).join(", ")}</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}