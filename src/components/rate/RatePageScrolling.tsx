"use client"

import { Spinner } from "@heroui/react"
import { useSession } from "next-auth/react"
import { MelodySession } from "@/lib/SpotifyAPI"
import { SpotifyTrack, TopTracks } from "@/lib/SpotifyAPITypes"
import { useEffect, useRef, useState } from "react"
import Song from "../song/Song"
import MelodyLogo from "../images/MelodyLogo"

const LOAD_ORDER = [
    'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=25&offset=0',
    'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=25&offset=25',
    'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=25&offset=0',
    'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=25&offset=25',
    'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=25&offset=0',
    'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=25&offset=25'
]

export default function RatePageScrolling() {

    const session = useSession();

    const spinner = useRef(null)

    const [call, setCall] = useState<number>(0)
    const [songs, setSongs] = useState<SpotifyTrack[]>([])

    useEffect(() => {

        const observer = new IntersectionObserver(async (entries) => {
            const target = entries[0]
            if (target.isIntersecting) {
                const new_data = await load(call)
                if (!new_data) return
                const all_data = songs.concat(new_data.items)
                const seen = new Set<string>()
                const data = all_data.filter(obj => {
                    if (seen.has(obj.id)) return false
                    seen.add(obj.id)
                    return true
                })
                setSongs(data)
                setCall(call + 1)
            }
        },{
            root: null,
            rootMargin: '200px'
        })

        const cur_spinner = spinner.current

        if (cur_spinner) {
            observer.observe(cur_spinner)
        }

        const load = async (page: number): Promise<TopTracks | null> => {
            if (session.status != "authenticated") {
                console.warn("There was an error with authenticating the user to load more recommendations.")
                return null
            }
            const res = await fetch(LOAD_ORDER[page], {
                headers: {
                    'Authorization': `Bearer ${(session.data as MelodySession).token.access_token}`
                }
            });
            const data = await res.json()
            return data
        }

        return () => {
            if (cur_spinner) {
                observer.unobserve(cur_spinner)
            }
        }

    }, [call, session.data, session.status, songs])

    return (
        <div>
            <div className="flex flex-col gap-2">
                {
                    songs.map((song, i) => (
                    <Song key={`${song.id}${i}`} song={song} />
                    ))
                }
            </div>
            <div className="flex items-center justify-center m-auto h-20">
                {
                    call === LOAD_ORDER.length ?
                    <div className="flex flex-col items-center gap-2">
                        <MelodyLogo/>
                        <p className="text-sm opacity-50">Turns out infinite scrolling is not so infinite after all...</p>
                    </div>
                    :
                    <Spinner
                        variant="dots"
                        ref={spinner}
                    />
                }
            </div>
        </div>
    )
}