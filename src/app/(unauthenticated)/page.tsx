'use client';

import { signIn } from "next-auth/react";
import { Button } from "@nextui-org/react";
import SpotifyLogo from "../images/spotify";

export default function Page() {

    return (
        <div className="h-[100dvh] w-[100%] flex justify-center items-center flex-col">
            <h1>Melody</h1>
            <p>Unleash your inner music critic.</p>
            <Button 
                className="mt-3 bg-[#414141] text-white w-[80%] sm:w-[15rem]" 
                variant="flat" 
                startContent={<SpotifyLogo/>}
                onPress={(e) => (
                    signIn("spotify", { callbackUrl: '/home' })
                )}
            >
                Sign in with Spotify &rarr;
            </Button>
        </div>
    )
}