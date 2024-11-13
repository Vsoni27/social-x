import { ClerkProvider } from "@clerk/nextjs";
import "@uploadthing/react/styles.css";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TopBar from "@/components/Bars/Topbar";
import Bottombar from "@/components/Bars/Bottombar";
import LeftSidebar from "@/components/Bars/LeftSidebar";
import RightSidebar from "@/components/Bars/RightSidebar";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SocialX",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body
          className={`${inter.className} bg-dark-1 text-white bg-black h-screen`}
        >
          <div className="flex flex-col w-full items-center h-full">
            <TopBar />
            <div className="flex w-full h-full">
              <LeftSidebar />
              {children}
              {/* <RightSidebar /> */}
            </div>
            <Bottombar />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
