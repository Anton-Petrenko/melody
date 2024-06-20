"use client"

import Image from "next/image";
import party from "@/../public/party.png";

export default function NewUserRating() {
    return (
        <>
            <div className="flex items-center justify-center gap-2">
                <h3>Hooray!</h3>
                <Image
                    src={party}
                    alt="Celebration Icon"
                    className="w-10 h-10"
                />
            </div>
            <p>Your first song is in your list!</p>
            <p>{`Ratings won't be applied to your songs until you have 10 songs rated.`}</p>
            <p>{`Make sure you get a good selection of songs - the rating scale starts at 1 and goes to 10!`}</p>
        </> 
    )
}