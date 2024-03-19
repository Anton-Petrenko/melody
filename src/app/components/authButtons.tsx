'use client'

import Image from "next/image";
import { signIn } from "next-auth/react";

export function SpotifySignInButton() {
    const handleClick = () => {
        signIn("spotify", { callbackUrl: 'https://melody-kappa-five.vercel.app/home' });
    }

    return (
        <button 
            onClick={handleClick}
            className="w-64 h-14 rounded-xl flex justify-center items-center gap-4 text-gray-300 hover:text-white bg-slate-950">
            <Image
                src="/spotifyLogo.png"
                alt="Spotify Logo"
                width={512}
                height={512}
                className="h-6 w-6"
            />
            <p className="duration-300 ease-in-out">Sign in with Spotify</p>
        </button>
    )
}