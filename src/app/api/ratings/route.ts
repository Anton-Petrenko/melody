import GetAuth from "@/lib/GetAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const session = await GetAuth()
    if (!session) {
        console.warn("There was an issue fetching the session data before requesting the ratings.")
        return NextResponse.json({
            message: "There was an issue fetching the session data before requesting the ratings."
        }, {
            status: 401
        })
    }

    if (session.token.spotify_id === undefined) {
        console.warn("There was an issue fetching the session data before requesting the ratings. (Could not find user id in token)")
        return NextResponse.json({
            message: "There was an issue fetching the session data before requesting the ratings."
        }, {
            status: 401
        })
    }

    const res = await fetch(`http://localhost:5001/ratings?user=${session.token.spotify_id}`)
    const data = await res.json()
    return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
    const client_ratings = await request.json()
    const session = await GetAuth()
    if (!session) {
        console.warn("There was an issue fetching the session data before requesting the ratings.")
        return NextResponse.json({
            message: "There was an issue fetching the session data before requesting the ratings."
        }, {
            status: 401
        })
    }

    if (session.token.spotify_id === undefined) {
        console.warn("There was an issue fetching the session data before requesting the ratings. (Could not find user id in token)")
        return NextResponse.json({
            message: "There was an issue fetching the session data before requesting the ratings."
        }, {
            status: 401
        })
    }

    const res = await fetch(`http://localhost:5001/ratings?user=${session.token.spotify_id}`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client_ratings)
        }
    )
    if (res.status != 200) {
        console.warn("There was an issue syncing the server with the client ratings.")
        return NextResponse.json({
            message: "There was an issue syncing the server with the client ratings."
        }, {
            status: 500
        })
    }
    const data = await res.json()
    return NextResponse.json(data)
}