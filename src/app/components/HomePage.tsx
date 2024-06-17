'use client'

import { Suspense, useContext } from "react";
import { Post } from "@/app/types/types";
import { Spinner } from "@nextui-org/react";
import SearchResults from "./SearchResults";
import HomeFeed from "@/app/components/HomeFeed";
import { UserDBContext } from "../providers/UserDBInfoProvider";

export default function HomePage (
    {
        searchParams,
        posts
    }:
    {
        searchParams?: {
            search?: string;
        },
        posts: Post[]
    }
) {

    const dbContext = useContext(UserDBContext);

    return (
        <div className="w-full sm:w-[30rem] flex flex-col items-center">
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
                        !dbContext.isPendingDBInit && 
                        <HomeFeed
                            posts={posts}
                        />     
                    }
                </>
            }
        </div>
    )
}