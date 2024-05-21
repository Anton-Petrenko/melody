import { Dispatch, SetStateAction } from "react"

interface Image {
    url: string,
    height: number | null,
    width: number | null,
}

export interface Artist {
    id: string,
    name: string,
    genres: string[],
    followers?: {
        total: number,
    },
    images: Image[],
}

export interface SimplifiedArtist {
    id: string,
    name: string
}

export interface Album {
    id: string,
    name: string,
    total_tracks: string,
    release_date: string,
    album_type: string,
    images: Image[],
    artists: Artist[]
}

export interface Track {
    id: string,
    name: string,
    preview_url: string | null,
    explicit: boolean,
    duration_ms: number,
    artists: Artist[],
    album: Album,
}

export interface User {
    id: string,
    display_name: string,
    country: string,
    email: string,
    followers?: {
        total: number
    }
    images: Image[],
}

export interface TrackSearchResult {
    tracks: {
        next?: string,
        previous?: string,
        items: Track[]
    }
}

export interface AudioProviderState {
    currentTrack: Track | null,
    currentTrackAudio: HTMLAudioElement | null;
    isPlaying: boolean,
    setCurrentTrack: Dispatch<SetStateAction<Track | null>>,
    play: () => Promise<void>,
    pause: () => void,
    togglePlay: () => Promise<void>
}

export interface RatingProviderState {
    ratedSongs: string[],
    setSongToRate: Dispatch<SetStateAction<Track | null>>
}

export interface UserDBState {
    dbID: number
}

export interface SearchState {
    term: string,
    setSearch: Dispatch<SetStateAction<string>>
}