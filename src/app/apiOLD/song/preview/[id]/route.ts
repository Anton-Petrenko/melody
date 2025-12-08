import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const fields = await params;

    const res = await fetch(`https://open.spotify.com/track/${fields.id}`)
    const data = await res.text()

    const index = data.indexOf("https://p.scdn.co/")
    const preview_link = data.slice(index, index+data.substring(index, index+200).indexOf("\""))
    if (index === -1 || preview_link === "") {
        return NextResponse.json(
            {
                message: "There was an error fetching the song preview."
            },
            {
                status: 404
            }
        )
    }

    return NextResponse.json({
        preview_link: preview_link
    })
}