"use client";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants/index";
import { usePathname, useRouter } from "next/navigation";
import logout from "@/public/assets/logout.svg";
import { SignOutButton, SignedIn, useClerk } from "@clerk/nextjs";

export default function LeftSidebar() {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div className="hidden lg:flex flex-col items-center p-4 gap-y-1 bg-[#15171B] rounded-r-lg w-1/5 h-5/6 mt-2">
      {sidebarLinks.map((item) => (
        <Link href={item.route} key={item.label} className="w-full">
          <div
            className={`flex justify-items-center gap-2 p-3 rounded-lg ${
              pathName === item.route && "bg-violet-700"
            } hover:bg-violet-700`}
          >
            <Image src={item.imgURL} alt={item.label} height={24} width={24} />
            <p className="font-bold text-sm hidden items-center sm:flex">
              {item.label}
            </p>
          </div>
        </Link>
      ))}
      <div className="mt-auto w-full">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex justify-items-center gap-2 p-3 rounded-lg hover:bg-red-500 cursor-pointer">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />

              <p className="font-bold text-sm hidden items-center sm:flex">
                Logout
              </p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
}
