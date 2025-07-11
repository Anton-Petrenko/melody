'use client'

import AudioPlayer from "@/components/AudioPlayer";
import { SpotifyTrack } from "@/lib/SpotifyAPITypes";
import { createContext, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export const AudioPlayerContext = createContext<AudioPlayerContext>({} as AudioPlayerContext);

export function AudioPlayerProvider ({ children }: Readonly<{ children: React.ReactNode; }>) {

    const jukebox = useRef<HTMLAudioElement | null>(null);

    const [volume, set_volume] = useState<number>(1);
    const [playing, setPlaying] = useState<boolean>(false);
    const [song, play] = useState<SpotifyTrack | null>(null);
    const [playback_time, setPlaybackTime] = useState<number>(0);
    const [duration, setDuration] = useState<number | null>(null);

    useEffect(() => {

        if (!jukebox.current) {
            console.warn("There was an error mounting the jukebox.")
            return
        }

        const audio = jukebox.current

        const handleEnded = () => {
            setPlaying(false)
        }
        const handlePlay = () => {
            setPlaying(true)
        }
        const handlePause = () => {
            setPlaying(false)
        }
        const handleLoadedMetadata = () => {
            setDuration(audio.duration)
        }
        const handleTimeUpdate = () => {
            setPlaybackTime(audio.currentTime)
        }
        const handleVolumeChange = () => {
            set_volume(audio.volume)
        }
        audio.addEventListener('ended', handleEnded)
        audio.addEventListener('play', handlePlay)
        audio.addEventListener('pause', handlePause)
        audio.addEventListener('loadedmetadata', handleLoadedMetadata)
        audio.addEventListener('timeupdate', handleTimeUpdate)
        audio.addEventListener('volumechange', handleVolumeChange)

        return () => {
            audio.removeEventListener('ended', handleEnded)
            audio.removeEventListener('play', handlePlay)
            audio.removeEventListener('pause', handlePause)
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
            audio.removeEventListener('timeupdate', handleTimeUpdate)
            audio.removeEventListener('volumechange', handleVolumeChange)
        }
        
    }, [])

    useEffect(() => {

        if (!jukebox.current || !song) {
            console.warn("There was an error starting playback of the song.")
            return
        }

        jukebox.current.src = song.preview_url as string

        try {
            jukebox.current.play()
        } catch {
            console.warn("There was an error loading the song.")
            play(null)
        }

    }, [song])

    useEffect(() => {
        if (!jukebox.current) {
            console.warn("There was an error changing the volume of the player.")
            return
        }
        jukebox.current.volume = volume
    }, [volume])

    const pause = () => {
        if (!jukebox.current) {
            console.warn("There was an error accessing the jukebox component.")
            return
        }
        jukebox.current.pause()
    }

    const resume = () => {
        if (!jukebox.current) {
            console.warn("There was an error accessing the jukebox component.")
            return
        }
        jukebox.current.play()
    }

    const skip_to = (seconds: number) => {
        if (!jukebox.current) {
            console.warn("There was an error accessing the jukebox component.")
            return
        }
        if (!duration) {
            console.warn("The song metadata has not been loaded yet.")
            return
        }
        if (0 > seconds || seconds > duration) {
            console.warn("A skip was requested outside the bounds of the song.")
        }
        jukebox.current.currentTime = seconds
    } 

    return (
        <AudioPlayerContext value={{
            song,
            play,
            playing,
            pause,
            resume,
            duration,
            playback_time,
            skip_to,
            volume,
            set_volume
        }}>
            <audio ref={jukebox} />
            {children}
            {
                song &&
                <div className="z-50">
                    <div className="h-16" />
                    <AudioPlayer/>
                </div>
            }
        </AudioPlayerContext>
    )
}

interface AudioPlayerContext {
    /** The current song loaded onto the player */
    song: SpotifyTrack | null
    /** Play a song via a SpotifyTrack object (NOTE: preview_url must be populated) */
    play: Dispatch<SetStateAction<SpotifyTrack | null>>
    /** Whether a song is currently being played out loud */
    playing: boolean
    /** Pause the current song */
    pause: () => void,
    /** Resumes playback of the loaded song */
    resume: () => void
    /** The duration (seconds) of the loaded song */
    duration: number | null
    /** The current time (seconds) of the playback */
    playback_time: number
    /** Skips the song to a specified number of seconds */
    skip_to: (seconds: number) => void
    /** The current volume of the audio */
    volume: number
    /** Set the current volume of the audio */
    set_volume: Dispatch<SetStateAction<number>>
}