import { ISODateString, Session } from "next-auth"
import { Dispatch, SetStateAction } from "react"
import { SpotifyTrack } from "./SpotifyTypes"


/** A type to represent the top-level app React context */
export interface AppProvider {
    audio: {
        isPlaying: boolean,
        currentTrack: SpotifyTrack | null,
        setCurrentTrack: Dispatch<SetStateAction<SpotifyTrack | null>>,
        pause: () => void,
        play: () => Promise<void>
    },
    rating: {
        ratedSongs: string[] | undefined
        setRatedSongs: Dispatch<SetStateAction<string[] | undefined>>,
        setNewUser: Dispatch<SetStateAction<boolean | null>>
    },
    session: MelodyUser | undefined
}

/** The user object in the clientside session */
export interface MelodyUser {
    update: (data?: any) => Promise<Session | null>,
    data: MelodySession,
    status: "authenticated" | "loading"
}

/** The session object definition given to the client */
export interface MelodySession extends Session {
    user?: {
        name?: string | null
        email?: string | null
        image?: string | null,
        picture: string | undefined,
        db_id: number | undefined,
        rated_songs: string[] | undefined,
        accessToken: string
      }
    expires: ISODateString
}