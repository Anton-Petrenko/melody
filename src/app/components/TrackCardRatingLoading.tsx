import Image from "next/image";

export default function TrackCardRatingLoading(
) {

    return (
        <div className="w-[90%] sm:w-full h-[5rem] sm:h-[6rem] bg-[#29292e] rounded-xl flex flex-row p-4 gap-4 justify-between">
            <Image
                src="/greyimage.jpg"
                alt="Loading"
                width={100}
                height={100}
                className="h-[3rem] w-[3rem] sm:h-[4rem] sm:w-[4rem] rounded-lg animate-pulse"
            />
            <div className="flex flex-col text-left w-full relative gap-2">
                <div className="h-[1rem] w-[4rem] bg-[#575768] animate-pulse rounded-xl"></div>
                <div className="h-[1rem] w-[10rem] bg-[#575768] animate-pulse rounded-xl"></div>
            </div>
            <div className="w-[3rem] flex h-full justify-center items-center">
            </div>
        </div>
    )
}