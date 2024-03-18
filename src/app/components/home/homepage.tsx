'use client'

import { Tabs, Tab } from "@nextui-org/react"
import { Track, Artist } from "@/app/types/types"
import Image from "next/image"

export default function Homepage( { topTracks, topArtists } : { topTracks: Track[], topArtists: Artist[] } ) {


    return (
        <div className="flex flex-col items-center justify-start gap-3 w-[100%] h-[90dvh] pt-3">
            <Tabs variant="light" size="lg">
                <Tab key="Home" title="Songs" className="overflow-x-hidden overflow-y-scroll no-scrollbar">
                    <div>
                        {topTracks.map((track) => (
                            <div key={track.id} className="w-[68vw] sm:w-[27rem] h-[10rem] bg-neutral-900/75 rounded-lg my-2 flex items-center p-5 gap-3">
                                <Image
                                    src={track.album.images[0].url}
                                    alt={track.name}
                                    height={track.album.images[0].height as number}
                                    width={track.album.images[0].width as number}
                                    className="w-28 h-28 rounded-md"
                                />
                                <div className="w-[100%] h-[100%]">
                                    <p className="opacity-50">{track.artists[0]?.name as string}</p>
                                    <h4 className="line-clamp-2">{track.name}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </Tab>
                <Tab key="Artists" title="Artists" className="overflow-x-hidden overflow-y-scroll no-scrollbar">
                    <div>
                        {topArtists.map((artist) => (
                            <div key={artist.id} className="w-[68vw] sm:w-[27rem] h-[10rem] bg-neutral-900/75 rounded-lg my-2 flex items-center p-5 gap-3 overflow-hidden">
                                <Image
                                    src={artist.images[0]?.url}
                                    alt={artist.name}
                                    height={artist.images[0]?.height as number}
                                    width={artist.images[0]?.width as number}
                                    className="h-auto w-24 object-center rounded-md"
                                />
                                <div className="w-[100%] h-[100%] flex flex-col justify-center">
                                    <h3 className="line-clamp-1">{artist.name}</h3>
                                    <p className="opacity-50">{artist.followers?.total.toLocaleString()} followers</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Tab>
            </Tabs>
        </div>
    )  

}