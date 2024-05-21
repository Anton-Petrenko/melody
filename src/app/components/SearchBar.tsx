'use client'

import { useContext } from "react";
import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { SearchContext } from "../providers/SearchProvider";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchBar() {

    // const pathname = usePathname();
    // const { replace } = useRouter();
    // const searchParams = useSearchParams();

    // function search(query: string) {
    //     const params = new URLSearchParams(searchParams);
    //     if (query) {
    //         params.set('search', query);
    //     } else {
    //         params.delete('search');
    //     }
    //     replace(`${pathname}?${params.toString()}`);
    // }

    const searchContext = useContext(SearchContext);

    return (
        <Input 
            placeholder='Search'
            startContent={<FaSearch/>}
            fullWidth={true}
            className='dark'
            onChange={(e) => {
                searchContext.setSearch(e.target.value);
            }}
            classNames={{ inputWrapper: [ "group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0" ] }}
        />
    )
}