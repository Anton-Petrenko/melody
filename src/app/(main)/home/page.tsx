'use server'

import GetAuth from "@/lib/GetAuth";
import MelodyLogo from "@/components/images/MelodyLogo";

export default async function Home() {
    const session = await GetAuth();
    return (
        <div>
            {
                session ?
                <Home_AUTH />
                :
                <Home_UNAUTH />
            }
        </div>
    )
}

const Home_AUTH = () => {
    return (
        <div className="flex flex-col items-center gap-2">
            <MelodyLogo/>
            <p>Welcome to Melody!</p>
            <p className="text-sm opacity-50">
                Melody is an active open-source project maintained by Anton Petrenko.
                <br/>
                Visit the github repository by clicking <a href="https://github.com/Anton-Petrenko/melody" className="text-lime-300" target="_blank">here.</a>
            </p>
            <p>To get started, click on the thumbs button on the navigation bar!</p>
        </div>
    )
}

const Home_UNAUTH = () => {
    return (
        <p>You are NOT authenticated.</p>
    )
}