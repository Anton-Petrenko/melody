'use client'

import TrackCard from "./TrackCard";
import { FaChevronDown } from "react-icons/fa";
import { RecentlyPlayedTracks, Track } from "../types/types";
import { Suspense, useContext, useState } from "react";
import { AudioContext } from "../providers/AudioProvider";
import { ButtonGroup, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner } from "@nextui-org/react";
import { getTopTracksMonth } from "../utils/SpotifyAPICalls";

export default function RatingFeed(
    {
        recentSongs,
        topMonth,
        top6Month,
        topYear
    }:
    {
        recentSongs: RecentlyPlayedTracks,
        topMonth: Track[],
        top6Month: Track[],
        topYear: Track[]
    }
) {

    const audioContext = useContext(AudioContext);
    const [selectedOption, setSelectedOption] = useState(new Set(["Recents"]));

    interface myMap {
        [key: string]: string
    }

    const descriptionsMap = {
        Recents: "The songs you've just been playing",
        TopMonth: "Your top songs of the month",
        Top6Months: "Your top songs in the last 6 months",
        TopYear: "Your top songs of the past year"
    } as myMap;

    const labelsMap = {
        Recents: "Recents",
        TopMonth: "New Finds",
        Top6Months: "Regular Jams",
        TopYear: "Classics"
    } as myMap;

    const selectedOptionValue = Array.from(selectedOption)[0];
    
    return (
        <div className="w-full sm:w-[30rem] flex flex-col items-center gap-2">
            <div className="flex flex-col justify-start w-[90%] sm:w-full relative">
                <h3>Rate Songs</h3>
                <div className="sm:absolute sm:right-0 h-full py-1">
                    <ButtonGroup variant="flat">
                        <Button 
                            disableAnimation
                            className="cursor-default"
                        >{labelsMap[selectedOptionValue]}</Button>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Button isIconOnly>
                                    <FaChevronDown/>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu 
                                disallowEmptySelection
                                aria-label="Display Songs by Option"
                                selectedKeys={selectedOption}
                                selectionMode="single"
                                onSelectionChange={(keys) => setSelectedOption(keys as Set<string>)}
                                className="max-w-[300px]"
                            >
                                <DropdownItem key="Recents" description={descriptionsMap["Recents"]}>
                                    {labelsMap["Recents"]}
                                </DropdownItem>
                                <DropdownItem key="TopMonth" description={descriptionsMap["TopMonth"]}>
                                    {labelsMap["TopMonth"]}
                                </DropdownItem>
                                <DropdownItem key="Top6Months" description={descriptionsMap["Top6Months"]}>
                                    {labelsMap["Top6Months"]}
                                </DropdownItem>
                                <DropdownItem key="TopYear" description={descriptionsMap["TopYear"]}>
                                    {labelsMap["TopYear"]}
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </ButtonGroup>
                </div>
            </div>
            {
                selectedOption.has("Recents") &&
                recentSongs.items.map((song) => (
                    <TrackCard
                        key={song.track.id}
                        track={song.track}
                    />
                ))
            }
            {
                selectedOption.has("TopMonth") && 
                topMonth.map((song) => (
                    <TrackCard
                        key={song.id}
                        track={song}
                    />
                ))
            }
            {
                selectedOption.has("Top6Months") &&
                top6Month.map((song) => (
                    <TrackCard
                        key={song.id}
                        track={song}
                    />
                ))
            }
            {
                selectedOption.has("TopYear") &&
                topYear.map((song) => (
                    <TrackCard
                        key={song.id}
                        track={song}
                    />
                ))
            }
        </div>
    )
}