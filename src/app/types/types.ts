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
    userObject: MelodyUser | null,
    isPendingDBInit: boolean
}

export interface SearchState {
    term: string,
    setSearch: Dispatch<SetStateAction<string>>
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
    rankings: string[] | null,
    liked: string[],
    hated: string[]
}

export interface Post {
    
    /** The database id of the given post */
    post_id: number,

    /** The database id of the user who posted this */
    user_id: number,

    /** The type of post (this keyword is used for conditional UI rendering) */
    type: "rating",

    /** The text content of the post */
    content: string,

    /** If applicable, the Spotify ID of the song to be displayed with the post */
    song_id?: string

    /** The Spotify API information about the song denoted by song_id */
    song_id_info: Track

    /** At the time of rating, the position this song was placed in the list */
    rating_pos: number,

    /** At the time of rating, the score this song was given by Melody for the user */
    rating_score: number,

    /** The data at which this post was posted */
    date: Date,

    /** The number of likes this post has */
    likes: number,

    /** The number of hates this post has */
    hates: number,

    /** The photo link of the user who posted this post */
    photo: string,

    /** The Spotify ID of the user who posted this post */
    api_id: string
}

export interface UserInfo {

    /** The database id of the user */
    db_id: number,
    
    /** The spotify api id of the user */
    api_id: string,

    /** The date the user was created */
    date_created: Date,

    /** The date the user last logged in */
    last_logged: Date,

    /** The link to the user profile photo */
    photo: string,

    /** An array of database id's (db_id's) of other Melody users this user is following */
    following: number[],

    /** An array of database id's (db_id's) of other Melody users that follow this user */
    followers: number[],

    /** The Melody display name of the user (non-unique) */
    display_name: string,

    /** The Melody account handle of the user (unique) */
    handle_name: string,

    /** The sorted array of Spotify song id's that this user has rated from "worst" to "best"
     * 
     * WARNING: This is a snapshot ONLY - do not manipulate this array or reference it as up-to-date information. Reference the App Context rankings.
     */
    rankings: string[],

    /** An array of post id's that the user has liked */
    liked: string[],

    /** An array of post id's that the use has disliked */
    hated: string[]
}

export interface AppContext {

    /** All audio options for the application */
    audio: {
        /** The information about the track that is loaded into the audio player  */
        currentTrack: Track | null,
    
        /** The raw HTML audio object for direct control */
        currentTrackAudio: HTMLAudioElement | null;
    
        /** A boolean indicating whether a song is currently playing */
        isPlaying: boolean,
    
        /** A useState setter to change the information about the current loaded track (linked to currentTrack) */
        setCurrentTrack: Dispatch<SetStateAction<Track | null>>,
    
        /** A function to play the currently loaded track */
        play: () => Promise<void>,
    
        /** A function to pause the currently loaded track */
        pause: () => void,
    
        /** A smart play/pause function to avoid overlapping audio output */
        togglePlay: () => Promise<void>
    },

    /** The search information for the application */
    search: {
        /** The current search term */
        term: string,

        /** A useState setter to set the current search term (linked to term) */
        setSearch: Dispatch<SetStateAction<string>>
    },

    /** Cached objects about the current app user from the database */
    dbCache: {
        /** The user object containing information about the current user */
        user: UserInfo | null,

        /** A boolean flagging if there is a current app-level fetch for database information about the current user */
        dbSyncIsPending: boolean
    },
    
    ratings: {
        /** The up-to-date sorted array of a user's current rated songs from "worst" to "best" */
        ratedSongs: string[] | null,

        /** Set the song the user would like to rate */
        setSongToRate: Dispatch<SetStateAction<Track | null>>
    }

}