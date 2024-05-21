import Image from "next/image";

export default function SpotifyLogo() {
    return (
        <Image 
            src="/spotify.png"
            alt="Spotify Logo"
            width={15}
            height={15}
        />
    )
}