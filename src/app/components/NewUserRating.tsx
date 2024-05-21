'use client'

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
            <p>Since it's the only song in your list, it will be scored a 10/10</p>
            <p>Don't worry - the ratings update each time you add a song!</p>
        </> 
    )
}