'use server'

import PostPage from "@/app/components/PostPage";
import { Track } from "@/app/types/types";
import { getPost } from "@/app/utils/DatabaseCalls";
import { getSongByID } from "@/app/utils/SpotifyAPICalls";

export default async function ExpandedPost(
    {
        params,
        searchParams
    }:
    {
        params?: {
            id: number
        },
        searchParams?: {
            search?: string
        }
    }
) {

    const post = params?.id ? await getPost(params.id) : null;
    const getSongData = async (id: string) => {
        const track = await getSongByID(id) as Track;
        return track
    }
    if (post?.song_id) {
        post.song_id_info = await getSongData(post.song_id);
    }

    return (
        <>
            {
                post ?
                <PostPage
                    post={post}
                />
                :
                <p className="opacity-50">This post doesn't exist.</p>
            }
        </>
    )
}