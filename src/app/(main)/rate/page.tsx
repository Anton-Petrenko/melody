'use server'

import { Suspense } from "react"
import SpinnerWrapper from "@/components/SpinnerWrapper"
import RateRecommendations from "@/components/RateRecommendations"

export default async function Home() {
    return (
        <div className="flex flex-col gap-1">
            <h2>Rate Songs</h2>
            <p className="mb-4">We generated a catalog for you:</p>
            <Suspense fallback={<SpinnerWrapper/>}>
                <RateRecommendations/>
            </Suspense>
        </div>
    )
}