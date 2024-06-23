'use client'

import debounce from "debounce";
import { useContext } from "react";
import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { MelodyContext } from "../OLDproviders/AppProvider";

export default function SearchBar() {

    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    // const userContext = useContext(UserDBContext);
    // const audioProvider = useContext(AudioContext);
    const app = useContext(MelodyContext);

    const handleSearch = debounce((term: string) => {
        app?.audio.pause();
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300)

    return (
        <>
        {
            !app?.dbCache.dbSyncIsPending ?
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
            :
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
                isDisabled
            />
        }
        </>
    )
}