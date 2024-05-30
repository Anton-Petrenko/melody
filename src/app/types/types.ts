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
    image: string 
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
    dbID: number | null,
    setdbID: Dispatch<SetStateAction<number | null>>,
    userObject: MelodyUser | null
}

export interface SearchState {
    term: string,
    setSearch: Dispatch<SetStateAction<string>>
}

export interface Post {
    post_id: number,
    user_id: number,
    date: Date,
    type: string,
    content: string | null,
    song_id: string | null,
    song_id_info: Track,
    photo: string | null,
    api_id: string,
    rating_pos: number,
    rating_score: string
}

export interface PlayHistory {
    track: Track,
    played_at: string
}

export interface RecentlyPlayedTracks {
    cursors: {
        after: string,
        before: string
    },
    next: string,
    items: PlayHistory[]
}

export interface MelodyUser {
    db_id: number,
    api_id: string,
    date_created: Date,
    last_logged: Date,
    photo: string,
    following: number[],
    followers: number[],
    display_name: string,
    handle_name: string,
    rankings: string[] | null
}