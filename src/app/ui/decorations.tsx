export function BlurryCircle({ color, x, y }: { color: string, x: string, y: string }) {
    return (
        <div className={`rounded-full w-64 h-64 absolute opacity-20 ${x} ${y} ${color} blur-2xl overflow-hidden`}>
        </div>
    )
}