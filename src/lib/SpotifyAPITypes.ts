/** The universal error object of the Spotify API */
export interface SpotifyAPIError {
    /** The HTTP status code (range 400-599)*/
    status: number
    /** A short description of the cause of the error. */
    message: string
}

/** The cursors used to find the next set of items. */
interface SpotifyAPICursor {
    /** The cursor to use as key to find the next page of items. */
    after: string
    /** The cursor to use as key to find the previous page of items. */
    before: string
}

interface SpotifyExternalURLS {
    /** The Spotify URL for the object. */
    spotify?: string
}

interface SpotifyImage {
    /** The source URL of the image. */
    url: string
    /** The image height in pixels. */
    height: number | null
    /** The image width in pixels. */
    width: number | null
}

interface SpotifyRestriction {
    /** The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content. Additional reasons may be added in the future. */
    reason: "market" | "product" | "explicit"
}

interface SpotifySimplifiedArtists {
    /** Known external URLs for this artist. */
    external_urls: SpotifyExternalURLS
    /** A link to the Web API endpoint providing full details of the artist. */
    href: string
    /** The Spotify ID for the artist. */
    id: string
    /** The name of the artist. */
    name: string
    /** The object type */
    type: "artist"
    /** The Spotify URI for the artist. */
    uri: string
}

interface SpotifyAlbum {
    /** The type of the album. */
    album_type: "album" | "single" | "compilation"
    /** The number of tracks in the album. */
    total_tracks: number
    /** The markets in which the album is available: ISO 3166-1 alpha-2 country codes. NOTE: an album is considered available in a market when at least 1 of its tracks is available in that market. */
    available_markets: string[]
    /** Known external URLs for this album. */
    external_urls: SpotifyExternalURLS
    /** A link to the Web API endpoint providing full details of the album. */
    href: string
    /** The Spotify ID for the album. */
    id: string
    /** The cover art for the album in various sizes, widest first. */
    images: SpotifyImage[]
    /** The name of the album. In case of an album takedown, the value may be an empty string. */
    name: string
    /** The date the album was first released. */
    release_date: string
    /** The precision with which release_date value is known. */
    release_date_precision: "year" | "month" | "day"
    /** Included in the response when a content restriction is applied. */
    restriction: SpotifyRestriction,
    /** The object type */
    type: "album"
    /** The Spotify URI for the album. This can be entered in the search box in a Spotify Desktop Client, to navigate to that resource. */
    uri: string
    /** The artists of the album. Each artist object includes a link in href to more detailed information about the artist. */
    artists: SpotifySimplifiedArtists[]
}

export interface SpotifyTrack {
    /** The album on which the track appears. */
    album: SpotifyAlbum
    /** The artists who performed the track. Each artist object includes a link in href to more detailed information about the artist. */
    artists: SpotifySimplifiedArtists[]
    /** A list of the countries in which the track can be played, identified by their ISO 3166-1 alpha-2 code. */
    available_markets: string[]
    /** The disc number (usually 1 unless the album consists of more than one disc). */
    disc_number: number
    /** The track length in milliseconds. */
    duration_ms: number
    /** Whether or not the track has explicit lyrics ( true = yes it does; false = no it does not OR unknown). */
    explicit: boolean
    /** Known external IDs for the track. */
    external_ids: {
        /** International Standard Recording Code */
        isrc?: string
        /** International Article Number */
        ean?: string
        /** Universal Product Code */
        upc?: string
    }
    /** Known external URLs for this track. */
    external_urls: SpotifyExternalURLS
    /** A link to the Web API endpoint providing full details of the track. */
    href: string
    /** The Spotify ID for the track. */
    id: string
    /** Part of the response when Track Relinking is applied. If true, the track is playable in the given market. Otherwise false. */
    is_playable: boolean
    /** Part of the response when Track Relinking is applied, and the requested track has been replaced with different track. The track in the linked_from object contains information about the originally requested track. */
    linked_from: unknown
    /** Included in the response when a content restriction is applied. */
    restrictions: SpotifyRestriction
    /** The name of the track. */
    name: string
    /** The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.
        The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.
        Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. Note: the popularity value may lag actual popularity by a few days: the value is not updated in real time. */
    popularity: number
    /** @deprecated A link to a 30 second preview (MP3 format) of the track. Can be null */
    preview_url: string | null
    /** The number of the track. If an album has several discs, the track number is the number on the specified disc. */
    track_number: number
    /** The object type: "track". */
    type: "track"
    /** The Spotify URI for the track. */
    uri: string
    /** Whether or not the track is from a local file. */
    is_local: boolean
}

interface SpotifyAPIPlayHistoryObject {
    /** The track the user listened to */
    track: SpotifyTrack,
    /** The date and time the track was played. [date-time] */
    played_at: string
    /** The context the track was played from. */
    context: {
        /** The object type, e.g. "artist", "playlist", "album", "show". */
        type: string,
        /** A link to the Web API endpoint providing full details of the track. */
        href: string,
        /** External URLs for this context. */
        external_urls: SpotifyExternalURLS
        /** The Spotify URI for the context. */
        uri: string
    }
}

/** Tracks from the current user's recently played tracks. Note: Currently doesn't support podcast episodes. */
export interface RecentlyPlayedTracks {
    /** A link to the Web API endpoint returning the full result of the request. */
    href: string
    /** The maximum number of items in the response (as set in the query or by default). */
    limit: number
    /** URL to the next page of items. (null if none) */
    next: string | null
    /** The cursors used to find the next set of items. */
    cursors: SpotifyAPICursor
    /** The total number of items available to return. */
    total: number
    items: SpotifyAPIPlayHistoryObject[]
}

/** The current user's top artists or tracks based on calculated affinity. */
export interface TopTracks {
    /** A link to the Web API endpoint returning the full result of the request */
    href: string
    /** The maximum number of items in the response (as set in the query or by default). */
    limit: number
    /** URL to the next page of items. */
    url: string | null
    /** The offset of the items returned (as set in the query or by default) */
    offset: number
    /** URL to the previous page of items. */
    previous: string | null
    /** The total number of items available to return. */
    total: number
    items: SpotifyTrack[]
}