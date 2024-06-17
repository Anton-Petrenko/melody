'use server'

import { Post, Track } from "@/app/types/types"
import { revalidatePath } from "next/cache"
import ProfilePage from "@/app/components/ProfilePage"
import { getPosts, getUserDBInfo } from "@/app/utils/DatabaseCalls"
import { getSongByID } from "@/app/utils/SpotifyAPICalls"

export default async function Profile(
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

    revalidatePath("/profile/[id]", "page");
    const profile = params?.id ? await getUserDBInfo(params.id) : null;

    var profileTop10 = null;
    if (profile && profile?.rankings && profile.rankings.length >= 10) {
        profileTop10 = new Array(5) as Track[]
        const promises = profile.rankings.slice(-5).map(
            async (id, index) => {
                profileTop10[5-index] = await getSongByID(id);
            }
        )
        await Promise.all(promises);
    }

    const posts = await getPosts(profile?.db_id as number, 5);
    const getSongData = async (id: string) => {
        const track = await getSongByID(id) as Track;
        return track
    }
    const promises = posts.map(async (post) => {
        if (post.song_id) {
          post.song_id_info = await getSongData(post.song_id);
          return post;
        }
    })
    const postsFilled = await Promise.all(promises) as Post[];

    return (
        <ProfilePage
            profile={profile}
            top10={profileTop10}
            postsFilled={postsFilled}
            searchParams={searchParams}
        />
    )
}