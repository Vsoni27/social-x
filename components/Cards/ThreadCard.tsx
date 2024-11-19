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
import { toggleLike } from "@/lib/actions/thread.action";
import { Button } from "../ui/button";
import { toggleFollow } from "@/lib/actions/user.action";

export default function ThreadCard({
  threadData,
  authorData,
  userId,
}: {
  threadData: ThreadDataType;
  authorData: UserDataType;
  userId: string;
}) {
  const [liked, setLiked] = useState<boolean>(
    threadData.likedBy.includes(userId)
  );

  const [likes, setLikes] = useState<number>(threadData.likedBy.length);

  const [followed, setFollowed] = useState<boolean>(
    authorData.followedBy.includes(userId)
  );

  async function handleLike() {
    try {
      const newLike = !liked;
      setLiked(newLike);
      setLikes((prevLikes) => (newLike ? prevLikes + 1 : prevLikes - 1));

      await toggleLike(userId, threadData._id, newLike);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFollow() {
    try {
      const newFollow = !followed;
      setFollowed(newFollow);

      await toggleFollow(userId, authorData._id, newFollow);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="bg-[#15171B] text-white border-0 flex flex-col justify-between w-full">
      <CardHeader className="flex flex-row items-center justify-between">
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
            <p className="text-xs font-semibold text-gray-500">
              {new Date(threadData.createdAt).toLocaleString("en-GB")}
            </p>
          </div>
        </div>
        {userId !== authorData._id && (
          <Button
            className="bg-violet-700 hover:bg-violet-500 rounded-full font-bold"
            onClick={handleFollow}
          >
            {followed ? "Unfollow" : "Follow"}
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <p className="text-gray-300 text-sm">{threadData.description}</p>
      </CardContent>
      <CardFooter className="flex items-center gap-x-2">
        {liked ? (
          <FaHeart
            onClick={handleLike}
            style={{ fill: "#FF0000" }}
            className="cursor-pointer"
          />
        ) : (
          <FaRegHeart onClick={handleLike} className="cursor-pointer" />
        )}
        <p className="text-xs text-gray-300 font-semibold">
          {toHumanString(likes)}
        </p>
      </CardFooter>
    </Card>
  );
}
