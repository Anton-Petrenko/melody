"use client"

// import { signIn } from "@/authOLD";
import { signIn } from "@/lib/auth-client";
import { Button } from "@heroui/button";
import SpotifyLogo from "@/components/images/SpotifyLogo";
// import CredentialsLogin from "@/components/CredentialsLogin";

export default function Home() {
  return (
    <div className="h-[100dvh] flex justify-center items-center flex-col">
      <h1>Melody</h1>
      <p>Unleash your inner music critic.</p>
      <div className="w-[80%] sm:w-[15rem] flex flex-col gap-3 mt-3">
        {/* <CredentialsLogin/> */}
        <Button
          disableRipple
          className="bg-[#414141] text-white"
          variant="flat"
          startContent={<SpotifyLogo/>}
          onPress={async () => {
            // 'use server'
            // await signIn('spotify', {
            //   redirect: true,
            //   redirectTo: '/home'
            // })
            await signIn.social({
              provider: "spotify",
              callbackURL: `/home`,
            })
          }}
        >
          Sign in with Spotify
        </Button>
      </div>
    </div>
  );
}
