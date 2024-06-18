"use client"

import { createContext, useEffect, useState } from "react"
import { SearchState } from "../OLDtypes/types";

export const SearchContext = createContext<SearchState>({term: ""} as SearchState);

export default function SearchProvider({ children, }: Readonly<{ children: React.ReactNode; }>){

    const [term, setSearch] = useState("");

    return (
        <SearchContext.Provider value={{
            term,
            setSearch
        }}>
            {children}
        </SearchContext.Provider>
    )
}