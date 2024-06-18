"use client"

import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import RatingDone from "../components/RatingDone";
import { Card, CardBody } from "@nextui-org/react";
import { getSongByID } from "../OLDutils/SpotifyAPICalls";
import NewUserRating from "../components/NewUserRating";
import TrackCardRating from "../components/TrackCardRating";
import { AppContext, Track, UserInfo } from "../OLDtypes/types";
import { createContext, useEffect, useState, useTransition } from "react";
import TrackCardRatingLoading from "../components/TrackCardRatingLoading";
import { addSong, addSongAtIndex, getUserDBID, getUserDBInfo } from "../OLDutils/DatabaseCalls";

/**
 * The master context object for the entire application.
 * 
 * NOTE: If the object is null, that means the context has not been loaded.
 */
export const MelodyContext = createContext<AppContext | null>(null);

export default function MelodyProvider({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const router = useRouter();

    // Audio Controls
    // --------------------------------

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [currentTrackAudio, setCurrentTrackAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {

        if (!currentTrack) return;
        if (isPlaying) {
            pause();
            setCurrentTrackAudio(null);
        }

        const newAudio = new Audio(currentTrack.preview_url as string);
        newAudio.preload="none";

        setCurrentTrackAudio(newAudio);
        return () => {
            pause();
            setCurrentTrackAudio(null);
        }

    }, [currentTrack])

    useEffect(() => {

        const handlePlay = async () => {
            if (currentTrackAudio) {
                await play();
            }
        };
        handlePlay();

    }, [currentTrackAudio])

    const play = async () => {
        setIsPlaying(true);
        if (currentTrackAudio?.volume) {
            currentTrackAudio.volume = 0.5
        }
        await currentTrackAudio?.play();
    };

    const pause = () => {
        setIsPlaying(false);
        currentTrackAudio?.pause();
    };

    const togglePlay = async () => {
        if (isPlaying) pause();
        else await play();
    };

    // Search Control
    // --------------------------------

    const [term, setSearch] = useState("");

    // User Control
    // --------------------------------

    const [dbSyncIsPending, startTransition] = useTransition();
    const [user, setUser] = useState<UserInfo | null>(null);

    
    // Ratings Control
    // --------------------------------
    
    const [left, setLeft] = useState<number>(-1);
    const [right, setRight]= useState<number>(-1);
    const [newUser, setNewUser] = useState<boolean | null>(null);
    const [midpoint, setMidpoint] = useState<number>(-1);
    const [showPostScreen, setPostScreen] = useState(false);
    const [ratedSongs, setRatedSongs] = useState<string[] | null>(null);
    const [compareTo, setCompareTo] = useState<Track | null>(null);
    const [songToRate, setSongToRate] = useState<Track | null>(null);

    useEffect(() => {
        if (ratedSongs) {
            setLeft(-1);
            setRight(ratedSongs.length);
            setMidpoint(Math.floor((ratedSongs.length - 1) / 2));
        }
        else {
            console.log("WARNING Code A");
        }
    }, [ratedSongs])

    useEffect(() => {

        if (ratedSongs && user) {
            pause();
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
                addSong(songToRate, user.db_id);
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
        }
        else {
            console.log("WARNING Code B");
        }

    }, [songToRate])

    async function serveNew(higher: boolean) {

        if (ratedSongs) {
            var left_ = left;
            var right_ = right;
            if (higher) {
                setLeft(midpoint);
                left_ = midpoint;
            } else {
                setRight(midpoint);
                right_ = midpoint;
            }
    
            pause();
    
            if (left_ == Math.floor((left_ + right_) / 2) && left_ == right_ - 1) {
                // done rating
                var indexToInsert = Math.floor((left_ + right_) / 2);
                if (left_ != -1) {indexToInsert++} else {indexToInsert = 0}
                await addSongAtIndex(songToRate as Track, user?.db_id as number, indexToInsert);
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
        } else {
            console.log("ERROR Code 03");
            router.push("/");
        }
    }
    
    // Global Calls at Load
    // --------------------------------
    
    useEffect(() => {
        
        startTransition(() => {
            const setUserDetails = async () => {
                const databaseID = await getUserDBID();
                if (!databaseID) { 
                    console.log("ERROR Code 01");
                }
                else {
                    const fullUserInfo = await getUserDBInfo(databaseID);
                    if (!fullUserInfo) {
                        console.log("ERROR Code 02");
                    }
                    else {
                        setUser(fullUserInfo);
                        setRatedSongs(fullUserInfo.rankings);
                        setNewUser(fullUserInfo.rankings.length == 0);
                    }
                }
            }
        
            if (!user && !dbSyncIsPending) {setUserDetails();}
        })

    }, [])

    return (
        <MelodyContext.Provider
            value={{
                audio: {
                    currentTrack,
                    currentTrackAudio,
                    isPlaying,
                    setCurrentTrack,
                    play,
                    pause,
                    togglePlay,
                },
                search: {
                    term,
                    setSearch
                },
                dbCache: {
                    user,
                    dbSyncIsPending
                },
                ratings: {
                    ratedSongs,
                    setSongToRate
                }
            }}
        >
            {
                songToRate &&
                <div className="absolute z-10 h-[100dvh] w-full bg-black/50 flex flex-col items-center">
                    <div 
                        className="h-full w-full absolute" 
                        onClick={() => setSongToRate(null)}>
                    </div>
                    <Card className="w-[95%] sm:w-[35rem] mt-40">
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
                                                ratedSongs={ratedSongs as string[]}
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
        </MelodyContext.Provider>
    )

}

