import { getAuthSession } from "../utils/server";
import { redirect } from "next/navigation";
import { getTopTracks } from "../api/apiCalls";
import { Track } from "../types/types";
import Image from "next/image";
import TabsHome from "../components/home/filterTabs";


export default async function Feed(){
    
    try {
        const session = await getAuthSession();
    
        if(!session) {
            redirect("/");
        }
    
        const topTracks = (await getTopTracks(session).then((data) => data.items)) as Track[];
    
        return (
            <div className="flex flex-col items-center justify-start gap-3 w-[100%] h-[90dvh] pt-3">
                <TabsHome/>
                <div className="overflow-y-auto overflow-x-hidden no-scrollbar">
                {topTracks.map((track) => (
                    <div key={track.id} className="w-[68vw] sm:w-[27rem] h-[10rem] bg-neutral-900/75 rounded-lg my-2 flex items-center p-5 gap-3">
                        <Image
                            src={track.album.images[0].url}
                            alt={track.name}
                            height={track.album.images[0].height as number}
                            width={track.album.images[0].width as number}
                            className="w-28 h-28 rounded-md"
                        />
                        <div className="w-[100%] h-[100%]">
                            <p className="opacity-50">{track.artists.at(0).name as string}</p>
                            <h3 className="line-clamp-2">{track.name}</h3>
                        </div>
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