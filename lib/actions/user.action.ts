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

export async function fetchUserById(userId: string){ // userId -> mongodb object id
  try {
    connectToDB();

    const user = await User.findById(userId);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchUserDetails(id: string | null) { // id -> provided by clerk
  try {
    connectToDB();

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
    connectToDB();
    
    await User.findOneAndUpdate({ id: data.id }, data, { upsert: true });
    // console.log("User on MongoDb: ", user);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function followUser(
  followingUserId: string,
  followedUserId: string
) {
  connectToDB();

  let fromUser = null,
    toUser = null;

  try {
    fromUser = await User.findOne({ _id: followingUserId });
    toUser = await User.findOne({ _id: followedUserId });
  } catch (error: any) {
    throw new Error(error.message);
  }

  if (!fromUser) {
    console.log(`UserID: ${followingUserId} invalid!!`);
    return;
  }
  if (!toUser) {
    console.log(`UserID: ${followedUserId} invalid!!`);
    return;
  }

  console.log(fromUser, toUser);

  try {
    const isFollowing = fromUser.following.includes(followedUserId);

    if (isFollowing) {
      // delete followedUserId from following array of fromUser(followingUserId)
      await User.findOneAndUpdate(
        { _id: followingUserId },
        { $pull: { following: followedUserId } }
      );
      // delete followingUserId from followedBy array of toUser(followedUserId)
      await User.findOneAndUpdate(
        { _id: followedUserId },
        { $pull: { followedBy: followingUserId } }
      );
      console.log(`${followingUserId} now unfollows ${followedUserId}`);
    } else {
      // add followedUserId in following array of fromUser(followingUserId)
      await User.findOneAndUpdate(
        { _id: followingUserId },
        { $addToSet: { following: followedUserId } }
      );
      // add followingUserId in followedBy array of toUser(followedUserId)
      await User.findOneAndUpdate(
        { _id: followedUserId },
        { $addToSet: { followedBy: followingUserId } }
      );
      console.log(`${followingUserId} now follows ${followedUserId}`);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
