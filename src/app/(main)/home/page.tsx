'use server'

import GetAuth from "@/lib/GetAuth";

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
        <p>You are authenticated!</p>
    )
}

const Home_UNAUTH = () => {
    return (
        <p>You are NOT authenticated.</p>
    )
}