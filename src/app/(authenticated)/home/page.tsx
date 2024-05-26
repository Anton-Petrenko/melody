import HomePage from "@/app/components/HomePage";
import { Post, Track } from "@/app/types/types";
import { getPosts, getUserDBID, syncLoginWithDB } from "@/app/utils/DatabaseCalls";
import { getSongByID } from "@/app/utils/SpotifyAPICalls";
import { redirect } from "next/navigation";



export default async function Home({
    searchParams,
  }: {
    searchParams?: {
      search?: string;
    };
  }) {
    // needs to be changed - async client function makes it so that syncLoginWithDB must be here because otherwise theres no guarantee the query for the user id will sequentially follow.
    // this also means these functions are being called each time we hit the home tab - not needed.
    // look how they did the data fetching in the nextjs tutorial project, there was caching and pages weren't rerendered for every navigation press

    const message = await syncLoginWithDB();
    var postsFilled = {} as Post[];
    if (message != "ERROR") {
      const dbID = await getUserDBID();
      const posts = await getPosts(dbID);
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
      postsFilled = await Promise.all(promises) as Post[];
    }
    else {
      redirect("/");
    }
  

    return (
      <HomePage
          searchParams={searchParams}
          posts={postsFilled}
      />
    )
}