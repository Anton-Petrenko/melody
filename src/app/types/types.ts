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
    followers?: {
        total: number
    }
    images: Image[],
}