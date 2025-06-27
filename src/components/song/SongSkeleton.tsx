export default function SongSkeleton({ image_size = 64 }: {image_size?: number}) {
    return (
        <div className="w-full flex gap-2 items-center relative animate-pulse">
            <div className="relative shrink-0 bg-gray-700 rounded-lg" style={{ width: `${image_size}px`, height: `${image_size}px` }}>

            </div>
            <div className="flex flex-col w-[50%] gap-2">
                <div className="bg-gray-700">
                    <div className="h-[0.5rem]"></div>
                </div>
                <div className="bg-gray-700">
                    <div className="h-[0.5rem]"></div>
                </div>
            </div>
            <div className="shrink-0 flex">
                <div className="w-10 h-10 cursor-pointer rounded-full flex items-center justify-center" ></div>
            </div>
        </div>
    )
}