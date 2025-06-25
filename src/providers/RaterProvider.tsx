'use client'

import Song from "@/components/Song"
import { SpotifyTrack } from "@/lib/SpotifyAPITypes"
import { IoMdThumbsDown, IoMdThumbsUp } from "react-icons/io"
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react"

const RATER_CATEGORIES = [
    "I don't like it",
    "It's okay",
    "I like this song!"
]

export const RaterContext = createContext<RaterProviderContext>({} as RaterProviderContext)

export function RaterProvider({ children }: Readonly<{ children: React.ReactNode; }>){

    const [is_open, open] = useState<boolean>(false);
    const [song, setSong] = useState<SpotifyTrack | null>(null);
    const [current_elo, setCurrentELO] = useState<number | null>(null);
    const [ratings, setRatings] = useState<MelodyUserRatings | null>(null);
    const [rater_category, setRaterCategory] = useState<number | null>(null);

    useEffect(() => {
        if (ratings) return
        const fetchRatings = async () => {
            const res = await fetch("/api/ratings")
            const data = await res.json() as MelodyUserRatings
            setRatings(data)
        }
        fetchRatings()
    })

    useEffect(() => {
        if (!is_open) {
            document.body.classList.remove('overflow-hidden')
            setCurrentELO(null)
            return
        }

        const opponent = () => {
            if (!ratings || rater_category === null || !song) return null
            const key = ["bad", "ok", "good"].at(rater_category)
            if (!key) return null
            if (ratings[key].find((rating) => rating.id_track === song.id)) {
                console.log("found!")
            } else {
                console.log("not found!")
            }
        }

        document.body.classList.add('overflow-hidden')
        opponent()

    }, [is_open, rater_category, ratings])

    useEffect(() => {
        if (rater_category === null) return
        setCurrentELO(1500)
    }, [rater_category])


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
                            <button  onClick={() => {open(false); setRaterCategory(null)}} role="button" tabIndex={0} aria-label="Close" className="cursor-pointer absolute appearance-none select-none top-1 end-1 p-2 text-foreground-500 rounded-full hover:bg-default-100 active:bg-default-200 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2" type="button" data-react-aria-pressable="true">
                                <svg aria-hidden="true" className="fill-current" fill="none" focusable="false" height="1em" role="presentation" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="1em">
                                    <path d="M18 6L6 18M6 6l12 12"></path>
                                </svg>
                            </button>
                            <header className="py-4 px-6 flex-initial text-large font-semibold flex flex-col gap-1">
                                <p className="truncate">Rate Song</p>
                            </header>
                            <div className="flex flex-1 flex-col gap-3 px-6 py-2">
                                <div className="flex justify-around">
                                    <div 
                                        className="w-[25%] duration-75 hover:bg-red-500/20 border border-red-500 h-[5rem] flex items-center justify-center rounded-lg cursor-pointer"
                                        style={{ backgroundColor: `${rater_category === 0 ? '#b7262e' : ''}`, scale: `${rater_category === 0 ? '1.05' : '1'}` }}
                                        onClick={() => setRaterCategory(0)}
                                    >
                                        <IoMdThumbsDown
                                            size="40px"
                                            className="translate-y-0.5"
                                        />
                                    </div>
                                    <div 
                                        className="w-[25%] duration-75 hover:bg-yellow-500/20 border border-yellow-500 h-[5rem] flex items-center justify-center rounded-lg cursor-pointer"
                                        style={{ backgroundColor: `${rater_category === 1 ? '#af8308' : ''}`, scale: `${rater_category === 1 ? '1.05' : '1'}` }}
                                        onClick={() => setRaterCategory(1)}
                                    >
                                        <p className="text-4xl">&#8212;</p>
                                    </div>
                                    <div 
                                        className="w-[25%] duration-75 hover:bg-green-500/20 border border-green-500 h-[5rem] flex items-center justify-center rounded-lg cursor-pointer"
                                        style={{ backgroundColor: `${rater_category === 2 ? '#079440' : ''}`, scale: `${rater_category === 2 ? '1.05' : '1'}` }}
                                        onClick={() => setRaterCategory(2)}
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
                                    <Song song={song} image_size={40} rate={false} />
                                    <div className="absolute w-[87%] h-full left-0 cursor-pointer" />
                                </div>
                                <div className="text-sm relative flex items-center justify-center group p-2">
                                    <div className="absolute w-full h-full group-hover:bg-[#303030] rounded-lg duration-150" />
                                    <Song song={song} image_size={40} rate={false} />
                                    <div className="absolute w-[87%] h-full left-0 cursor-pointer" />
                                </div>
                            </div>
                            <footer className="flex flex-row gap-2 px-6 py-4 justify-end">
                                <button type="button" tabIndex={0} data-react-aria-pressable="true" className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&amp;>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent text-danger data-[hover=true]:bg-danger/20">
                                    Close
                                </button>
                                <button type="button" tabIndex={0} data-react-aria-pressable="true" className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&amp;>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover">
                                    Action
                                </button>
                            </footer>
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

interface MelodyUserRatings {
    [key: string]: MelodyRating[]
    /** A sorted array of the users least favorite songs (index 0 worst) */
    bad: MelodyRating[]
    /** A sorted array of the users okay songs (index 0 worst) */
    ok: MelodyRating[]
    /** A sorted array of the users favorite songs (index 0 worst) */
    good: MelodyRating[]
}

interface MelodyRating {
    /** The Spotify ID of the track */
    id_track: string
    /** The ELO rating of the song */
    elo_rating: number
}
