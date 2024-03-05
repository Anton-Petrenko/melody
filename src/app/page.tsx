import { SpotifySignInButton } from "./components/authButtons"
import { Button } from "@nextui-org/react"

export default function Home() {
    return (
        <main className="flex justify-center min-h-screen flex-col text-center gap-4 splash w-screen px-5 items-center">
            <div className="flex justify-center flex-col items-start gap-5 w-screen h-screen px-36 md:px-20 lg:px-32">
                <h1>Melody</h1>
                <SpotifySignInButton/>
            </div>
        </main>
    )
}