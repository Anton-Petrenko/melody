'use server'


import { Track } from "@/app/types/types"
import ProfilePage from "@/app/components/ProfilePage"
import { getUserDBInfo } from "@/app/utils/DatabaseCalls"
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

    return (
        <ProfilePage
            profile={profile}
            top10={profileTop10}
            searchParams={searchParams}
        />
    )
}