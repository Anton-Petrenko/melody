import DisplayPost from "./Post";
import { Post, Track } from "../OLDtypes/types";
import { getPosts } from "../OLDutils/DatabaseCalls";
import { getSongByID } from "../OLDutils/SpotifyAPICalls";
import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";
import SearchResults from "./SearchResults";

export default async function HomeFeed(
    {
        searchParams
    }:
    {
        searchParams?: {
            search?: string;
        }
    }
) {

    const posts = await getPosts();
    var postsFilled = null;
    if (posts) {
        const getSongData = async (id: string) => {
          const track = await getSongByID(id) as Track;
          return track
        }
        const promises = posts.map(async (post) => {
          if (post.song_id) {
            post.song_id_info = await getSongData(post.song_id);
            return post;
          } else {
            console.log("WARNING Code C");
            return {} as Post;
          }
        })
    
        postsFilled = await Promise.all(promises);
    }

    return (
        <>
        {
            searchParams?.search ?
            <Suspense fallback={<Spinner color="default" className="h-full"/>}>
                <SearchResults
                        search={searchParams?.search}
                />
            </Suspense>
            :
            <>
                {
                    postsFilled && postsFilled.length > 0 ?
                    <>
                        <div className="flex flex-col justify-start w-[90%] sm:w-full">
                            <h3>Feed</h3>
                        </div>
                        {
                            postsFilled.map((post) => (
                                <DisplayPost
                                    key={post.post_id}
                                    post={post}
                                />
                            ))
                        }
                    </>
                    :
                    <p>Nothing</p>
                    // <div className="h-full flex items-center text-center">
                    //     <p className="opacity-70">No posts available</p>
                    // </div>
                }
            </>
        }
        </>
    )
}