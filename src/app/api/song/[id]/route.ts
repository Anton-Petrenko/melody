// import GetAuth from "@/lib/GetAuth";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const fields = await params;
    
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    const token = await auth.api.getAccessToken({
        body: {
            providerId: "spotify",
            userId: session?.user.id,
        }
    }).then((token) => token.accessToken)

    // const auth = await GetAuth()
    if (!auth) {
        return NextResponse.json({
            message: "There was an issue with authentication."
        }, {
            status: 401
        })
    }

    const res = await fetch(`https://api.spotify.com/v1/tracks/${fields.id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    const data = await res.json()
    return NextResponse.json(data)
}