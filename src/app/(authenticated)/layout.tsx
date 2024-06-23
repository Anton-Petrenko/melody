import type { Metadata } from "next";
import MelodyProvider from "../providers/AppProvider";
import NavigationBar from "../components/NavigationBar";

export const metadata: Metadata = {
  title: "Melody",
  description: "Unleash your inner music critic.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  
  return (
    <MelodyProvider>
      <NavigationBar>
        {children}
      </NavigationBar>
    </MelodyProvider>
  );
}