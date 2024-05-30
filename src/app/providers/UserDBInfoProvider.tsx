"use client"

import { getUserDBID } from "../utils/DatabaseCalls";
import { MelodyUser, UserDBState } from "../types/types";
import { createContext, useEffect, useState } from "react";

export const UserDBContext = createContext<UserDBState>({} as UserDBState);

export default function UserDBInfoProvider({ children, }: Readonly<{ children: React.ReactNode; }>){
    
    const [dbID, setdbID] = useState<number | null>(null);
    const [userObject, setUserObject] = useState<MelodyUser | null>(null);

    useEffect(() => {

        const setID = async () => {
            const melodyUser = await getUserDBID();
            setdbID(melodyUser?.db_id as number);
            setUserObject(melodyUser);
        }

        if (!dbID) {
            setID()
        }
        
    }, [])

    return (
        <UserDBContext.Provider value={{
            dbID,
            setdbID,
            userObject
        }}>
            {children}
        </UserDBContext.Provider>
    )
}