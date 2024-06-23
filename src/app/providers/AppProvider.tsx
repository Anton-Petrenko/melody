"use client"

import { useSession } from "next-auth/react";
import { AppProvider, MelodyUser } from "../types/AppTypes";
import { SpotifyTrack } from "../types/SpotifyTypes";
import { createContext, useEffect, useState } from "react";

/**
 * The master context object for the entire application. NOTE: If the object is null, that means the context has not been loaded.
 */
export const MelodyContext = createContext<AppProvider | null>(null);

export default function MelodyProvider({ children, }: Readonly<{ children: React.ReactNode; }>) {

    // Audio Control

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
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

    const [term, setSearch] = useState("");

    // Rating Control

    const [left, setLeft] = useState<number>(-1);
    const [right, setRight]= useState<number>(-1);
    const [midpoint, setMidpoint] = useState<number>(-1);
    const [showPostScreen, setPostScreen] = useState(false);
    const [newUser, setNewUser] = useState<boolean | null>(null);
    const [ratedSongs, setRatedSongs] = useState<string[] | undefined>(undefined);
    const [compareTo, setCompareTo] = useState<SpotifyTrack | null>(null);
    const [songToRate, setSongToRate] = useState<SpotifyTrack | null>(null);

    // useEffect(() => {
    //     if (ratedSongs) {
    //         setLeft(-1);
    //         setRight(ratedSongs.length);
    //         setMidpoint(Math.floor((ratedSongs.length - 1) / 2));
    //     }
    //     else {
    //         console.log("WARNING Code 006");
    //     }
    // }, [ratedSongs])

    // useEffect(() => {
    //     if (ratedSongs && user) {
    //         pause();
    //         setPostScreen(false);
    //         if (!songToRate) {
    //             setCompareTo(null);
    //             setLeft(-1);
    //             setRight(ratedSongs.length);
    //             setMidpoint(Math.floor((ratedSongs.length - 1) / 2));
    //             return
    //         }
    //         if (ratedSongs.length == 0) {
    //             setRatedSongs([songToRate.id]);
    //             addSong(songToRate, user.db_id);
    //             setCompareTo(null);
    //             return
    //         }
            
    //         setNewUser(false);
    //         const getSongToCompare = async () => {
    //             const id = ratedSongs.at(midpoint as number);
    //             const songInfo = (await getSongByID(id as string)) as Track;
    //             setCompareTo(songInfo);
    //         }
    //         getSongToCompare();
    //     }
    //     else {
    //         console.log("WARNING Code B");
    //     }

    // }, [songToRate])

    // async function serveNew(higher: boolean) {

    //     if (ratedSongs) {
    //         var left_ = left;
    //         var right_ = right;
    //         if (higher) {
    //             setLeft(midpoint);
    //             left_ = midpoint;
    //         } else {
    //             setRight(midpoint);
    //             right_ = midpoint;
    //         }
    
    //         pause();
    
    //         if (left_ == Math.floor((left_ + right_) / 2) && left_ == right_ - 1) {
    //             // done rating
    //             var indexToInsert = Math.floor((left_ + right_) / 2);
    //             if (left_ != -1) {indexToInsert++} else {indexToInsert = 0}
    //             await addSongAtIndex(songToRate as Track, user?.db_id as number, indexToInsert);
    //             setRatedSongs([
    //                 ...ratedSongs.slice(0, indexToInsert),
    //                 songToRate?.id as string,
    //                 ...ratedSongs.slice(indexToInsert)
    //             ])
    //             if (ratedSongs.length >= 10) {
    //                 setPostScreen(true);
    //             }
    //             else {
    //                 setSongToRate(null);
    //             }
    //         }
    //         else {
    //             // serve next song
    //             const newMid = Math.floor((left_ + right_) / 2);
    //             setMidpoint(newMid);
    //             const id = ratedSongs.at(newMid);
    //             const songInfo = (await getSongByID(id as string)) as Track;
    //             setCompareTo(songInfo);
    //         }
    //     } else {
    //         console.log("ERROR Code 03");
    //         router.push("/");
    //     }
    // }

    // Global Call at Load

    // useEffect(() => {
        
        // startTransition(() => {
        //     const setUserDetails = async () => {
        //         const databaseID = await getUserDBID();
        //         if (!databaseID) { 
        //             console.log("ERROR Code 01");
        //         }
        //         else {
        //             const fullUserInfo = await getUserDBInfo(databaseID);
        //             if (!fullUserInfo) {
        //                 console.log("ERROR Code 02");
        //             }
        //             else {
        //                 setUser(fullUserInfo);
        //                 setRatedSongs(fullUserInfo.rankings);
        //                 setNewUser(fullUserInfo.rankings.length == 0);
        //             }
        //         }
        //     }
        
        //     if (!user && !dbSyncIsPending) {setUserDetails();}
        // })

    // }, [])

    // Session
    const auth = useSession({ required: true }) as MelodyUser;
    const [session, setSession] = useState<MelodyUser | undefined>(undefined);

    useEffect(() => {
        if (auth.status == "authenticated" && !session) {
            setSession(auth);
            setRatedSongs(auth.data.user?.rated_songs ? auth.data.user.rated_songs : []);
            setNewUser(auth.data.user?.rated_songs ? auth.data.user.rated_songs.length == 0 : true);
        }
    }, [auth])

    return (
        <MelodyContext.Provider value={{
            audio: {
                isPlaying,
                currentTrack,
                setCurrentTrack,
                pause,
                play
            },
            rating: {
                ratedSongs,
                setRatedSongs,
                setNewUser
            },
            session
        }}>
            {children}
        </MelodyContext.Provider>
    )

}