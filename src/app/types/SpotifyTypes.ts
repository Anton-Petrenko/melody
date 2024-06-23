export interface SpotifyTrack {
    id: string,
    name: string,
    preview_url: string | null,
    explicit: boolean,
    duration_ms: number,
    artists: SpotifyArtist[],
    album: SpotifyAlbum
}

export interface SpotifyAlbum {
    id: string,
    name: string,
    total_tracks: string,
    release_date: string,
    album_type: string,
    images: SpotifyImage[],
    artists: SpotifyArtist[]
}

export interface SpotifyArtist {
    id: string,
    name: string,
    genres: string[],
    followers?: {
        total: number,
    },
    images: SpotifyImage[],
}

export interface SpotifyImage {
    url: string,
    height: number | null,
    width: number | null,
}

export interface SpotifyPlayHistoryObject {
    played_at: string,
    track: SpotifyTrack
}