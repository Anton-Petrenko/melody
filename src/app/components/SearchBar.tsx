'use client'

import debounce from "debounce";
import { useContext } from "react";
import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { AudioContext } from "../providers/AudioProvider";
import { UserDBContext } from "../providers/UserDBInfoProvider";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchBar() {

    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const userContext = useContext(UserDBContext);
    const audioProvider = useContext(AudioContext);

    const handleSearch = debounce((term: string) => {
        audioProvider.pause();
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300)

    // const searchContext = useContext(SearchContext);

    return (
        <>
            <Input 
                placeholder='Search'
                startContent={<FaSearch/>}
                fullWidth={true}
                className='dark'
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                classNames={{ inputWrapper: [ "group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0" ] }}
                defaultValue={searchParams.get('search')?.toString()}
            />
        </>
    )
}