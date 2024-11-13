"use client";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants/index";
import { usePathname, useRouter } from "next/navigation";

export default function Bottombar() {
  const pathName = usePathname();

  return (
    <div className="lg:hidden w-full">
      <div className="flex items-center p-2 gap-1 bg-[#15171B] rounded-t-lg w-full h-[50px]">
        {sidebarLinks.map((item) => (
          <Link href={item.route} key={item.label} className="w-full">
            <div
              className={`flex justify-center items-center gap-2 p-3 rounded-lg ${
                pathName === item.route && "bg-violet-700"
              } hover:bg-violet-700`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                height={24}
                width={24}
              />
              <p className="font-bold text-sm sm:flex hidden items-center">
                {item.label.split(" ")[0]}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
