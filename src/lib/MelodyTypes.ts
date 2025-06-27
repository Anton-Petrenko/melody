export interface MelodyUserRatings {
    [key: string]: string[]
    /** A sorted array of the users least favorite songs (index 0 worst) */
    bad: string[]
    /** A sorted array of the users okay songs (index 0 worst) */
    ok: string[]
    /** A sorted array of the users favorite songs (index 0 worst) */
    good: string[]
}