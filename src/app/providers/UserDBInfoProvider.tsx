"use client"

import { getUserDBID, getUserDBInfo } from "../utils/DatabaseCalls";
import { MelodyUser, UserDBState } from "../types/types";
import { createContext, useEffect, useState, useTransition } from "react";

export const UserDBContext = createContext<UserDBState>({} as UserDBState);

export default function UserDBInfoProvider({ children, }: Readonly<{ children: React.ReactNode; }>){
    
    const [isPendingDBInit, startTransition] = useTransition();
    const [dbID, setdbID] = useState<number | null>(null);
    const [userObject, setUserObject] = useState<MelodyUser | null>(null);

    useEffect(() => {
        startTransition(() => {
            const setID = async () => {
                const melodyUser = await getUserDBID();
                const fullInfo = await getUserDBInfo(melodyUser?.db_id as number);
                setdbID(melodyUser?.db_id as number);
                setUserObject(fullInfo);
            }
    
            if (!dbID) {
                setID()
            }
        })      
    }, [])

    return (
        <UserDBContext.Provider value={{
            dbID,
            setdbID,
            userObject,
            isPendingDBInit
        }}>
            {children}
        </UserDBContext.Provider>
    )
}