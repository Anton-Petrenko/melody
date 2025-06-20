import Image from "next/image";

export default function HomeLogo() {
    return (
        <Image
            src="/images/home.png"
            alt="Home"
            width={33}
            height={33}
        />
    )
}