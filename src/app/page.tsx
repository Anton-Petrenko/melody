import { BlurryCircle } from "./ui/decorations"
import { SpotifySignInButton } from "./components/authButtons"

export default function Home() {
    return (
        <main className="flex justify-center min-h-screen flex-col text-center gap-4 splash w-screen px-5 items-center">
            <div className="h-unit-6xl w-1/3 backdrop-blur-lg bg-slate-800/90 rounded-[2.5rem] flex justify-center py-5 flex-col items-center gap-5">
                <h1>Melody</h1>
                <SpotifySignInButton/>
            </div>
        </main>
    )
}