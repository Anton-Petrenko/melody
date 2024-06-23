import RateForYou from "@/app/components/RateForYou";
import { Suspense } from "react";

export default function Rate() {
    return (
        <div>
            <h3 className="sm:w-[35rem] w-[95%]">Rate Songs</h3>
            <p className="sm:w-[35rem] w-[95%] opacity-50 mb-3">We've generated a catalog based on your Spotify activity: </p>
            <Suspense>
                <RateForYou/>
            </Suspense>
        </div>
    )
}