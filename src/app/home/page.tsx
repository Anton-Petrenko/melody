import { getAuthSession } from "../utils/server";
import { redirect } from "next/navigation";
import { getTopItems, getProfile } from "../api/apiCalls";
import { Track } from "../types/types";
import TabsHome from "../components/home/filterTabs";

export default async function Feed(){

    try {
        const session = await getAuthSession();
    
        if(!session) {
            redirect("/");
        }
    
        const topTracks = (await getTopItems(session).then((data) => data.items)) as Track[];
    
        return (
            <div className="flex flex-col items-center justify-start gap-3 w-[100%] h-[90dvh] pt-3">
                <TabsHome/>
                <div className="overflow-y-auto overflow-x-hidden no-scrollbar">
                {topTracks.map((track) => (
                    <div key={track.id} className="w-[68vw] sm:w-[27rem] h-[10rem] bg-neutral-900 rounded-lg my-2">
                        
                    </div>
                ))}
                </div>
            </div>
        )
    }
    catch(e) {
        redirect("/");
    }

}