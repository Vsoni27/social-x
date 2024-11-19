"use server";

import User from "../Models/user.model";
import { connectToDB } from "../mongoose";

interface Props {
  id: string;
  name: string;
  username: string;
  bio: string;
  image: string;
  onboarded: Boolean;
}

export async function fetchUserById(userId: string) {
  // userId -> mongodb object id
  try {
    await connectToDB();

    const user = await User.findById(userId);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchUserDetails(id: string | null) {
  // id -> provided by clerk
  try {
    await connectToDB();

    if (!id) {
      const user = await User.find({});
      return user;
    } else {
      const user = await User.findOne({ id: id });
      return user;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function createUpdateUser(data: Props) {
  try {
    await connectToDB();

    await User.findOneAndUpdate({ id: data.id }, data, { upsert: true });
    // console.log("User on MongoDb: ", user);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function toggleFollow(
  followingUserId: string,
  followedUserId: string,
  follow: boolean
) {
  try {
    if (followingUserId === followedUserId) {
      throw new Error("Can't follow yourself...");
    }

    await connectToDB();

    if (follow) {
      // follow the user
      await User.findByIdAndUpdate(
        followingUserId,
        { $push: { following: followedUserId } },
        { new: true }
      );

      await User.findByIdAndUpdate(
        followedUserId,
        { $push: { followedBy: followingUserId } },
        { new: true }
      );

      console.log(`${followingUserId} follows ${followedUserId}`);
    } else {
      // unfollow the user
      await User.findByIdAndUpdate(followingUserId, {
        $pull: { following: followedUserId },
      });

      await User.findByIdAndUpdate(followedUserId, {
        $pull: { followedBy: followingUserId },
      });

      console.log(`${followingUserId} unfollows ${followedUserId}`);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
