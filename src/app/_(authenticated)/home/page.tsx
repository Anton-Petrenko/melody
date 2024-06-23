import HomeFeed from "@/app/components/HomeFeed";
import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";

export default async function Home({
    searchParams,
  }: {
    searchParams?: {
      search?: string;
    };
  }) {

    // const posts = await getPosts(dbID?.db_id as number);
    // const getSongData = async (id: string) => {
    //   const track = await getSongByID(id) as Track;
    //   return track
    // }
    // const promises = posts.map(async (post) => {
    //   if (post.song_id) {
    //     post.song_id_info = await getSongData(post.song_id);
    //     return post;
    //   }
    // })
    // const postsFilled = await Promise.all(promises) as Post[];

    return (
      // <HomePage
      //     searchParams={searchParams}
      //     posts={postsFilled}
      // />
      <div className="w-full sm:w-[30rem] flex flex-col items-center">
        <Suspense fallback={<Spinner color="default" className="h-full"/>}>
          <HomeFeed
            searchParams={searchParams}
          />
        </Suspense>
      </div>
    )
}