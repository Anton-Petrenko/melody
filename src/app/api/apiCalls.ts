const useAPI = async (url: string, session: any) => {

    if(!session){
        return null;
    }

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
        }
    }).then((res) => res.json())

    return res;
}

export const getTopTracks = async (session: any) => {
    return useAPI("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", session);
}

export const getTopArtists = async (session: any) => {
    return useAPI("https://api.spotify.com/v1/me/top/artists?time_range=short_term", session);
}

export const getProfile = async (session: any) => {
    return useAPI("https://api.spotify.com/v1/me", session);
}