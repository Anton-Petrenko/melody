'use server'

import { Post, Track } from "@/app/types/types";
import HomePage from "@/app/components/HomePage";
import { getSongByID } from "@/app/utils/SpotifyAPICalls";
import { getPosts, getUserDBID } from "@/app/utils/DatabaseCalls";

export default async function Home({
    searchParams,
  }: {
    searchParams?: {
      search?: string;
    };
  }) {

    const dbID = await getUserDBID();
    const posts = await getPosts(dbID?.db_id as number);
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
      <HomePage
          searchParams={searchParams}
          posts={postsFilled}
      />
    )
}