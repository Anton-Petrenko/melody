import { signIn } from "@/auth";
import { Button } from "@heroui/button";
import SpotifyLogo from "@/components/images/SpotifyLogo";

export default function Home() {
  return (
    <div className="h-[100dvh] flex justify-center items-center flex-col">
      <h1>Melody</h1>
      <p>Unleash your inner music critic.</p>
      <Button
        disableRipple
        className="mt-3 bg-[#414141] text-white w-[80%] sm:w-[15rem]"
        variant="flat"
        startContent={<SpotifyLogo/>}
        onPress={async () => {
          'use server'
          await signIn('spotify', {
            redirect: true,
            redirectTo: '/home'
          })
        }}
      >
        test
      </Button>
    </div>
  );
}
