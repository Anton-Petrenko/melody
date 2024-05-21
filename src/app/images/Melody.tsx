import Image from "next/image";

export default function MelodyLogo(
    {
        width,
        height
    }:
    {
        width: number,
        height: number
    }
) {
    return (
        <Image
            src="/melody.png"
            alt="Melody logo"
            width={width}
            height={height}
        />
    )
}