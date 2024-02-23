import { BlurryCircle } from "./ui/decorations"
import { SpotifySignInButton } from "./components/authButtons"

export default function Home() {
    return (
        <main className="flex justify-center items-center min-h-screen flex-col text-center gap-4">
            <BlurryCircle
                color="bg-fuchsia-900"
                x="translate-x-[125px]"
                y="translate-y-10"
            />
            <BlurryCircle
                color="bg-pink-700"
                x="-translate-x-[125px]"
                y="-translate-y-10"
            />
            <h1>Melody</h1>
            <h2>Unleash your inner music critic.</h2>
            <SpotifySignInButton/>
        </main>
    )
}