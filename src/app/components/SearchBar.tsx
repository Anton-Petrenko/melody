'use client'

import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchBar() {

    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();

    function search(query: string) {
        const params = new URLSearchParams(searchParams);
        if (query) {
            params.set('search', query);
        } else {
            params.delete('search');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Input 
            placeholder='Search'
            startContent={<FaSearch/>}
            fullWidth={true}
            className='dark'
            onChange={(e) => {
                search(e.target.value)
            }}
            classNames={{ inputWrapper: [ "group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0" ] }}
        />
    )
}