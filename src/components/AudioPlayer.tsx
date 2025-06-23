'use client'

import Image from "next/image";
import { useContext, useState } from "react";
import { Slider, Tooltip } from "@heroui/react";
import { AudioPlayerContext } from "@/providers/AudioPlayerProvider";
import { FaPause, FaPlay, FaVolumeHigh, FaVolumeLow, FaVolumeXmark } from "react-icons/fa6";

export default function AudioPlayer() {

    const audioPlayer = useContext(AudioPlayerContext);
    const [ui_volume, setUIVolume] = useState<number>(100)

    return (
        <div className="fixed bottom-0 bg-[#0a0a0a] w-full h-16 flex items-center justify-center z-50">
            <div className="flex items-center sm:justify-center gap-4 mx-6 w-[100dvw] sm:px-4">
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
                <div className="w-[20rem] shirnk sm:flex hidden">
                    {
                        audioPlayer.song && audioPlayer.duration &&
                        <Slider
                            size="sm"
                            color="foreground"
                            hideThumb
                            minValue={0}
                            maxValue={Math.round(audioPlayer.duration)}
                            value={Math.round(audioPlayer.playback_time)}
                            startContent={<p className="text-sm opacity-70">0:{Math.round(audioPlayer.playback_time).toString().padStart(2, "0")}</p>}
                            endContent={<p className="text-sm opacity-70">0:{Math.round(audioPlayer.duration)}</p>}
                            onChangeEnd={(value) => {
                                if (Array.isArray(value)) return
                                audioPlayer.skip_to(value)
                            }}
                        />
                    }
                </div>
                {
                    audioPlayer.song &&
                    <div className="flex gap-2 overflow-hidden">
                        <div className="w-8 h-8 relative shrink-0 sm:flex hidden items-center justify-center">
                            <Tooltip
                                className="h-[8rem] bg-[#0a0a0a]"
                                containerPadding={30}
                                content={
                                    <Slider
                                        size="sm"
                                        minValue={0}
                                        maxValue={100}
                                        value={ui_volume}
                                        orientation="vertical"
                                        color="foreground"
                                        onChange={(value) => {
                                            if (Array.isArray(value)) return
                                            setUIVolume(value)
                                            audioPlayer.set_volume(value/100)
                                        }}
                                    />
                                }
                            >
                                {
                                    audioPlayer.volume*100 > 50 ?
                                    <FaVolumeHigh size="20px"/>
                                    : (
                                        audioPlayer.volume*100 > 0 ?
                                        <FaVolumeLow size="18px" />
                                        :
                                        <FaVolumeXmark size="20px" />
                                    )
                                }
                            </Tooltip>
                        </div>
                        <div className="w-8 h-8 relative shrink-0">
                            <Image
                                src={audioPlayer.song.album.images.length > 0 ? audioPlayer.song.album.images[0].url : "/images/defaultcoverart.png"}
                                alt={`${audioPlayer.song.name} by ${audioPlayer.song.artists.map((artist) => artist.name).join(", ")}`}
                                fill={true}
                                className="rounded-sm"
                            />
                        </div>
                        <div className="flex flex-col text-xs justify-center overflow-hidden min-w-0 max-w-[20rem]">
                            <p className="font-bold truncate">{audioPlayer.song.name}</p>
                            <p className="opacity-50 truncate">{audioPlayer.song.artists.map(artist => artist.name).join(", ")}</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}