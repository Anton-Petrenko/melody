import Image from "next/image";

export default function MelodyLogo() {
    return (
        <Image
            src="/images/melody.png"
            alt="Melody Logo"
            width={30}
            height={30}
        />
    )
}