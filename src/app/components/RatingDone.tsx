"use client"

import { Track } from "../types/types"

export default function RatingDone(
    {
        track,
        ratedSongs
    }:
    {
        track: Track,
        ratedSongs: string[]
    }
) {
    return (
        <>
            <h3>{`It's official!`}</h3>
        </>
    )
}