import { SpotifyTrack } from "./SpotifyAPITypes"
import { MelodyUserRatings } from "./MelodyTypes"

/** Takes a value in a specified range and proportionally converts it to a new range */
const renormalize = (val: number, og_min: number, og_max: number, new_min: number, new_max: number): number => {
    const numerator = ((val - og_min) * (new_max - new_min))
    const denominator = (og_max - og_min)
    return new_min + (numerator / denominator)
}

/** Get the rating of a song given the global ratings object */
export const get_rating = (ratings: MelodyUserRatings, song: SpotifyTrack): number | null => {
    for (const key of ["bad", "ok", "good"]) {
        const index = ratings[key].findIndex(id => id === song.id)
        if (index != -1) {
            return (ratings[key].length === 1 ? { "bad": 2.5, "ok": 5, "good": 7.5 }[key] as number : renormalize(index, -1, ratings[key].length, { "bad": 0, "ok": 3.5, "good": 6.5 }[key] as number, { "bad": 3.4, "ok": 6.4, "good": 9.9 }[key] as number))
        }
    }
    return null
}