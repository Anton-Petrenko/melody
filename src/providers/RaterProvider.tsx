'use client'

import Image from "next/image"
import Song from "@/components/Song"
import { Button } from "@heroui/react"
import { get_rating } from "@/lib/Melody"
import { SpotifyTrack } from "@/lib/SpotifyAPITypes"
import { MelodyUserRatings } from "@/lib/MelodyTypes"
import { IoMdThumbsDown, IoMdThumbsUp } from "react-icons/io"
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react"

const RATER_CATEGORIES = [
    "I don't like it",
    "It's okay",
    "I like this song!"
]

export const RaterContext = createContext<RaterProviderContext>({} as RaterProviderContext)

export function RaterProvider({ children }: Readonly<{ children: React.ReactNode; }>){

    const [done_rating, setDone] = useState(false);
    const [is_open, open] = useState<boolean>(false);
    const [syncing, setSyncing] = useState<boolean>(false);
    const [song, setSong] = useState<SpotifyTrack | null>(null);
    const [submittable, setSubmittable] = useState<boolean>(false);
    const [song_rating, setSongRating] = useState<number | null>(null);
    const [ratings, setRatings] = useState<MelodyUserRatings | null>(null);
    const [song_opponent, setOpponent] = useState<SpotifyTrack | null>(null);
    const [rater_category, setRaterCategory] = useState<number | null>(null);

    const [lo, setLo] = useState<number | null>(null);
    const [mid, setMid] = useState<number | null>(null);
    const [hi, setHi] = useState<number | null>(null);

    useEffect(() => {
        if (ratings) return
        const fetchRatings = async () => {
            const res = await fetch("/api/ratings")
            const data = await res.json() as MelodyUserRatings
            setRatings(data)
            console.log(data)
        }
        fetchRatings()
    }, [ratings])

    useEffect(() => {
        if (!is_open) {
            setDone(false)
            setRaterCategory(null)
            setOpponent(null)
            document.body.classList.remove('overflow-hidden')
            return
        }
        document.body.classList.add('overflow-hidden')
    }, [is_open, ratings])

    const handleCategoryChange = (cat: number) => {
        if (!ratings) return

        setRaterCategory(cat)
        const key = ["bad", "ok", "good"][cat]
        if (!ratings[key].length) {
            setOpponent(null)
            setSubmittable(true)
            return
        } else {
            setSubmittable(false)
        }

        const new_lo = 0
        const new_hi = ratings[key].length
        const new_mid = Math.floor((new_lo+new_hi) / 2)

        serve_opponent(ratings[key][new_mid])

        setLo(new_lo)
        setHi(new_hi)
        setMid(new_mid)

    }

    const handleWinner = (id: string) => {
        if (!song || !song_opponent || !ratings || rater_category === null || mid === null || lo === null || hi === null) return
        const key = ["bad", "ok", "good"][rater_category]

        const new_lo = id === song.id ? (mid + 1) : lo
        const new_hi = id === song_opponent.id ? (mid) : hi
        const new_mid = Math.floor((new_lo+new_hi) / 2)

        if (new_lo < new_hi) {
            serve_opponent(ratings[key][new_mid])
        }
        else {
            setSubmittable(true)
        }

        setLo(new_lo)
        setHi(new_hi)
        setMid(new_mid)
    }

    const handleSubmit = async () => {
        if (rater_category === null || !song || !ratings) return
        
        setSyncing(true)

        const new_ratings = ratings
        const submit_lo = lo === null ? 0 : lo
        new_ratings[["bad", "ok", "good"][rater_category]].splice(submit_lo, 0, song.id)
        await sync_ratings(new_ratings)
        setRatings(new_ratings)
        setSongRating(get_rating(new_ratings, song))

        setSyncing(false)
        setDone(true)
    }

    const serve_opponent = async (id: string) => {
        const opp = await fetch_song(id)
        setOpponent(opp)
    }

    const sync_ratings = async (ratings: MelodyUserRatings) => {
        const res = await fetch("/api/ratings", {
            method: "POST",
            body: JSON.stringify(ratings)
        })
        if (res.status != 200) {
            console.warn("There was an issue syncing ratings with the server")
        }
        return res.status
    }

    const fetch_song = async (id: string) => {
        const res = await fetch(`/api/song/${id}`)
        const data = await res.json() as SpotifyTrack
        return data
    }

    return (
        <RaterContext value={{
            open,
            setSong,
            ratings
        }}>
            {
                song &&
                <div tabIndex={-1} className={`${is_open === false && 'hidden'}`}>
                    <div className="bg-overlay/50 backdrop-opacity-disabled w-screen h-screen fixed inset-0 z-40"/>
                    <div className="flex w-screen fixed inset-0 z-40 overflow-x-auto justify-center items-center">
                        <section className="flex flex-col relative z-50 w-full box-border bg-content1 outline-none mx-1 my-1 sm:mx-6 sm:my-16 max-w-lg rounded-large shadow-small overflow-y-hidden">
                            <button disabled={syncing} onClick={() => open(false)} role="button" tabIndex={0} aria-label="Close" className="cursor-pointer absolute appearance-none select-none top-1 end-1 p-2 text-foreground-500 rounded-full hover:bg-default-100 active:bg-default-200 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2" type="button" data-react-aria-pressable="true">
                                <svg aria-hidden="true" className="fill-current" fill="none" focusable="false" height="1em" role="presentation" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="1em">
                                    <path d="M18 6L6 18M6 6l12 12"></path>
                                </svg>
                            </button>
                                {   done_rating && ratings ?
                                    <div>
                                        <header className="py-4 px-6 flex-initial text-large font-semibold flex flex-col gap-1">
                                            <p className="truncate">Your song is rated! &#127881;</p>
                                        </header>
                                        <div className="flex flex-1 flex-col gap-3 px-6 py-2 items-center">
                                            <div className="w-[10rem] h-[10rem] flex items-center justify-center relative">
                                                <div className="absolute w-full h-full -z-10">
                                                    <Image
                                                        fill={true}
                                                        alt={`${song.name} by ${song.artists.map((artist) => artist.name).join(", ")}`}
                                                        src={(song.album && song.album.images.length > 0) ? song.album.images[0].url : "/images/defaultcoverart.png"}
                                                        className="rounded-lg"
                                                    />
                                                </div>
                                                <div className="w-[7rem] h-[7rem] flex items-center justify-center rounded-full shadow-small" style={{ background: song_rating ? (song_rating < 3.45 ? 'linear-gradient(45deg, #a9674d, #834127, #e7a58b 70%, #9b593f)' : (song_rating < 6.45 ? 'linear-gradient(45deg, #E0E0E0, #FCFCFC, #ADADAD 70%, #CECECE)' : 'linear-gradient(45deg, #BF953F, #FCF6BA, #B38728 70%, #FBF5B7)') ) : '' }}>
                                                    <p className="text-5xl font-bold text-shadow-md" style={{ color: song_rating ? (song_rating < 3.45 ? '#391D11' : (song_rating < 6.45 ? '#5e5e5e' : '#644b17') ) : '' }}>{ song_rating && song_rating.toFixed(1) }</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center items-center text-center">
                                                <p className="font-bold opacity-70 text-sm">{song.artists.map(artist => artist.name).join(", ")}</p>
                                                <p className="font-bold text-lg">{song.name}</p>
                                            </div>
                                            <footer className="flex flex-row gap-2 px-6 py-2 justify-center">
                                            </footer>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <header className="py-4 px-6 flex-initial text-large font-semibold flex flex-col gap-1">
                                            <p className="truncate">Rate Song</p>
                                        </header>
                                        <div className="flex flex-1 flex-col gap-3 px-6 py-2">
                                            <div className="flex justify-around">
                                                <div 
                                                    className="w-[25%] duration-75 hover:bg-red-500/20 border border-red-500 h-[5rem] flex items-center justify-center rounded-lg cursor-pointer"
                                                    style={{ backgroundColor: `${rater_category === 0 ? '#b7262e' : ''}`, scale: `${rater_category === 0 ? '1.05' : '1'}` }}
                                                    onClick={() => handleCategoryChange(0)}
                                                >
                                                    <IoMdThumbsDown
                                                        size="40px"
                                                        className="translate-y-0.5"
                                                    />
                                                </div>
                                                <div 
                                                    className="w-[25%] duration-75 hover:bg-yellow-500/20 border border-yellow-500 h-[5rem] flex items-center justify-center rounded-lg cursor-pointer"
                                                    style={{ backgroundColor: `${rater_category === 1 ? '#af8308' : ''}`, scale: `${rater_category === 1 ? '1.05' : '1'}` }}
                                                    onClick={() => handleCategoryChange(1)}
                                                >
                                                    <p className="text-4xl">&#8212;</p>
                                                </div>
                                                <div 
                                                    className="w-[25%] duration-75 hover:bg-green-500/20 border border-green-500 h-[5rem] flex items-center justify-center rounded-lg cursor-pointer"
                                                    style={{ backgroundColor: `${rater_category === 2 ? '#079440' : ''}`, scale: `${rater_category === 2 ? '1.05' : '1'}` }}
                                                    onClick={() => handleCategoryChange(2)}
                                                >
                                                    <IoMdThumbsUp
                                                        size="40px"
                                                        className="-translate-y-0.5"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <p className="text-sm">{rater_category != null ? RATER_CATEGORIES[rater_category] : 'Did you like the song?'}</p>
                                            </div>
                                            <div className="text-sm relative flex items-center justify-center group p-2">
                                                <div className="absolute w-full h-full group-hover:bg-[#303030] rounded-lg duration-150" />
                                                <Song song={song} image_size={40} rate={false} show_rating={false} />
                                                <div className="absolute w-[87%] h-full left-0 cursor-pointer" 
                                                    onClick={() => handleWinner(song.id)}
                                                />
                                            </div>
                                            {
                                                song_opponent &&
                                                <div className="text-sm relative flex items-center justify-center group p-2">
                                                    <div className="absolute w-full h-full group-hover:bg-[#303030] rounded-lg duration-150" />
                                                    <Song song={song_opponent} image_size={40} rate={false} show_rating={false} />
                                                    <div className="absolute w-[87%] h-full left-0 cursor-pointer" 
                                                        onClick={() => handleWinner(song_opponent.id)}
                                                    />
                                                </div>
                                            }
                                        </div>
                                        <footer className="flex flex-row gap-2 px-6 py-4 justify-center">
                                            <Button
                                                fullWidth={true}
                                                isLoading={syncing}
                                                isDisabled={!submittable}
                                                onPress={handleSubmit}
                                            >
                                                Rate
                                            </Button>
                                        </footer>
                                    </div>
                                }
                        </section>
                    </div>
                </div>
            }
            {children}
        </RaterContext>
    )
}

interface RaterProviderContext {
    /** Open the rating screen */
    open: Dispatch<SetStateAction<boolean>>
    /** Set the song to be rated */
    setSong: Dispatch<SetStateAction<SpotifyTrack | null>>,
    /** The exhaustive list of all current user ratings */
    ratings: MelodyUserRatings | null
}