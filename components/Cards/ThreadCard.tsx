"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { toHumanString } from "human-readable-numbers";
import { useState } from "react";
import { ThreadDataType, UserDataType } from "@/lib/types";


export default function ThreadCard({threadData, authorData}: {threadData: ThreadDataType, authorData: UserDataType}) {
  const [Liked, setLiked] = useState<boolean>(false);

  return (
    <Card className="md:w-2/3 bg-[#15171B] text-white border-0 flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-center gap-x-2">
          <div
            className="flex rounded-full overflow-hidden"
            style={{ width: "45px", height: "45px" }}
          >
            <Image
              src={authorData?.image}
              alt={authorData.name[0].toUpperCase()}
              height={85}
              width={85}
              priority={true}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col p-2">
            <h1 className="text-sm font-semibold">{authorData.username}</h1>
            <p className="text-xs text-gray-500">2023-05-09</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <p className="text-gray-300 text-sm">
          {threadData.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center gap-x-2">
        {Liked ? (
          <FaHeart
            onClick={() => setLiked((Liked) => !Liked)}
            style={{ fill: "#956CD6" }}
            className="cursor-pointer"
          />
        ) : (
          <FaRegHeart
            onClick={() => setLiked((Liked) => !Liked)}
            className="cursor-pointer"
          />
        )}
        <p className="text-xs text-gray-300 font-semibold">
          {toHumanString(3500000)}
        </p>
      </CardFooter>
    </Card>
  );
}
