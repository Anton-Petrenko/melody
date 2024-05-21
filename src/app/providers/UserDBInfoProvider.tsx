"use client"

import { UserDBState } from "../types/types"
import { getUserDBID } from "../utils/DatabaseCalls";
import { createContext, useEffect, useState } from "react";

export const UserDBContext = createContext<UserDBState>({} as UserDBState);

export default function UserDBInfoProvider({ children, }: Readonly<{ children: React.ReactNode; }>){
    
    const [dbID, setdbID] = useState<number>(0);

    useEffect(() => {
        const getID = async () => {
            const uID = await getUserDBID();
            setdbID(uID as number);
        }
        getID();
    }, [])

    return (
        <UserDBContext.Provider value={{
            dbID
        }}>
            {children}
        </UserDBContext.Provider>
    )
}