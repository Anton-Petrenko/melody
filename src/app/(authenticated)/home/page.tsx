'use client'

import { Spinner } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getUserDBID } from "@/app/utils/DatabaseCalls";
import SearchResults from "../../components/SearchResults";

export default function Home(
    {
        searchParams
    }:
    {
        searchParams?: {
            query?: string
        }
    }
) {

    const query = useSearchParams();
    const search = query.get("search");

    const [dbID, setdbID] = useState<number | null>(null);

    useEffect(() => {
        const dbID = async () => {
            const id = (await getUserDBID());
            setdbID(id as number);
        }
        dbID();
    }, [])

    return (
        <div className="w-full sm:w-[30rem] flex flex-col items-center gap-2">
            {
                search ?
                <Suspense fallback={<Spinner color="default" className="h-full"/>}>
                    <SearchResults
                        search={search}
                    />
                </Suspense>
                :
                <p className="h-full flex items-center">Search something!</p>
            }
        </div>
    )
}