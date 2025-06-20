import { Suspense } from "react"
import RateRecommendations from "@/components/RateRecommendations"

export default function Home() {
    return (
        <div className="flex flex-col gap-1">
            <h2>Rate Songs</h2>
            <p>We generated a catalog for you:</p>
            <Suspense>
                <RateRecommendations/>
            </Suspense>
        </div>
    )
}