'use server'

import { Suspense } from "react"
import SpinnerWrapper from "@/components/SpinnerWrapper"
import RatePageServer from "@/components/rate/RatePageServer"
import RatePageScrolling from "@/components/rate/RatePageScrolling"

export default async function Home() {
    return (
        <div className="flex flex-col gap-1">
            <h2>Rate Songs</h2>
            <p className="mb-4">We generated a catalog for you:</p>
            <Suspense fallback={<SpinnerWrapper/>}>
                <RatePageServer/>
                <RatePageScrolling/>
            </Suspense>
        </div>
    )
}