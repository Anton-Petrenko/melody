"use client"

import { IoMdClose } from "react-icons/io";
import { AudioContext } from "./AudioProvider";
import RatingDone from "../components/RatingDone";
import { Card, CardBody } from "@nextui-org/react";
import { UserDBContext } from "./UserDBInfoProvider";
import { getSongByID } from "../utils/SpotifyAPICalls";
import NewUserRating from "../components/NewUserRating";
import { RatingProviderState, Track } from "../types/types";
import TrackCardRating from "../components/TrackCardRating";
import TrackCardRatingLoading from "../components/TrackCardRatingLoading";
import { addSong, addSongAtIndex, getRatedSongs } from "../utils/DatabaseCalls";
import { Suspense, createContext, useContext, useEffect, useRef, useState } from "react";

export const RatingContext = createContext<RatingProviderState>({} as any);

export default function RatingProvider({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const userDBInfo = useContext(UserDBContext);
    const audioContext = useContext(AudioContext);

    
    const [left, setLeft] = useState<number>(-1);
    const [right, setRight]= useState<number>(-1);
    const [newUser, setNewUser] = useState<boolean>();
    const [midpoint, setMidpoint] = useState<number>(-1);
    const [showPostScreen, setPostScreen] = useState(false);
    const [ratedSongs, setRatedSongs] = useState([] as string[]);
    const [compareTo, setCompareTo] = useState<Track | null>(null);
    const [songToRate, setSongToRate] = useState<Track | null>(null);

    useEffect(() => {
        const getArray = async () => {
            const arr = await getRatedSongs();
            setRatedSongs(arr as string[])
        }
        getArray();
        setNewUser(ratedSongs.length == 0);
    }, []);

    useEffect(() => {
        setLeft(-1);
        setRight(ratedSongs.length);
        setMidpoint(Math.floor((ratedSongs.length - 1) / 2));
    }, [ratedSongs])

    useEffect(() => {

        audioContext.pause();
        setPostScreen(false);
        if (!songToRate) {
            setCompareTo(null);
            setLeft(-1);
            setRight(ratedSongs.length);
            setMidpoint(Math.floor((ratedSongs.length - 1) / 2));
            return
        }
        if (ratedSongs.length == 0) {
            setRatedSongs([songToRate.id]);
            addSong(songToRate, userDBInfo.dbID as number);
            setCompareTo(null);
            return
        }
        
        setNewUser(false);
        const getSongToCompare = async () => {
            const id = ratedSongs.at(midpoint as number);
            const songInfo = (await getSongByID(id as string)) as Track;
            setCompareTo(songInfo);
        }
        getSongToCompare();

    }, [songToRate])

    async function serveNew(higher: boolean) {

        var left_ = left;
        var right_ = right;
        if (higher) {
            setLeft(midpoint);
            left_ = midpoint;
        } else {
            setRight(midpoint);
            right_ = midpoint;
        }

        audioContext.pause();

        if (left_ == Math.floor((left_ + right_) / 2) && left_ == right_ - 1) {
            // done rating
            var indexToInsert = Math.floor((left_ + right_) / 2);
            if (left_ != -1) {indexToInsert++} else {indexToInsert = 0}
            await addSongAtIndex(songToRate as Track, userDBInfo.dbID as number, indexToInsert);
            setRatedSongs([
                ...ratedSongs.slice(0, indexToInsert),
                songToRate?.id as string,
                ...ratedSongs.slice(indexToInsert)
            ])
            if (ratedSongs.length >= 10) {
                setPostScreen(true);
            }
            else {
                setSongToRate(null);
            }
        }
        else {
            // serve next song
            const newMid = Math.floor((left_ + right_) / 2);
            setMidpoint(newMid);
            const id = ratedSongs.at(newMid);
            const songInfo = (await getSongByID(id as string)) as Track;
            setCompareTo(songInfo);
        }

    }

    return (
        <RatingContext.Provider value={{
            ratedSongs,
            setSongToRate
        }}
        >
            {
                songToRate &&
                <div className="absolute z-10 h-screen w-full bg-black/50 flex flex-col justify-center items-center">
                    <div 
                        className="h-full w-full absolute" 
                        onClick={() => setSongToRate(null)}>
                    </div>
                    <Card className="w-[95%] sm:w-[35rem]">
                        <CardBody className="flex flex-col gap-2 sm:px-10 px-4 py-8 items-center justify-center relative text-center">
                            <IoMdClose 
                                className="absolute right-2 top-2 cursor-pointer"
                                size={20} 
                                onClick={() => setSongToRate(null)}
                            />
                            {
                                newUser ? <NewUserRating/> :
                                <>
                                    {   
                                        !showPostScreen ?
                                        <>
                                            <div>
                                                <h3>Rating Song</h3>
                                                <small>{songToRate.name} by {songToRate.artists.at(0)?.name as string}</small>
                                            </div>
                                            <TrackCardRating
                                                track={songToRate}
                                                serveNew={serveNew}
                                                higher={true}
                                            />
                                            {
                                                compareTo ?
                                                <TrackCardRating
                                                    track={compareTo}
                                                    serveNew={serveNew}
                                                    higher={false}
                                                />
                                                :
                                                <TrackCardRatingLoading/>
                                            }
                                        </>
                                        :
                                        <>
                                            <RatingDone
                                                track={songToRate}
                                                ratedSongs={ratedSongs}
                                            />
                                        </>
                                    }
                                </>
                            }
                        </CardBody>
                    </Card>
                </div>
            }
            {children}
        </RatingContext.Provider>
    )
}

function async() {
    throw new Error("Function not implemented.");
}
