import GetAuth from "@/lib/GetAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const fields = await params;

    const auth = await GetAuth()
    if (!auth) {
        return NextResponse.json({
            message: "There was an issue with authentication."
        }, {
            status: 401
        })
    }

    const res = await fetch(`https://api.spotify.com/v1/tracks/${fields.id}`, {
        headers: {
            "Authorization": `Bearer ${auth.token.access_token}`
        }
    })
    const data = await res.json()
    return NextResponse.json(data)
}