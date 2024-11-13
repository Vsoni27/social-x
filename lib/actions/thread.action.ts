"use server";

import { revalidatePath } from "next/cache";
import Thread from "../Models/thread.model";
import User from "../Models/user.model";
import { connectToDB } from "../mongoose";

interface Props {
  text: string;
  authorId: string;
  communityId?: string | null;
  parentId?: string | null;
  path: string;
}

export async function createThread(data: Props) {
  try {
    connectToDB();

    const createdThread = await Thread.create({
      description: data.text,
      author: data.authorId,
      community: data?.communityId,
      parentId: data?.parentId, // if its a comment to a thread
    });

    console.log("Thread created: ", createdThread);

    const updatedUser = await User.findOneAndUpdate(
      { _id: data.authorId },
      { $push: { threads: createdThread._id } },
      { new: true }
    );

    console.log("Updated user", updatedUser);

    revalidatePath(data.path);
    return createdThread;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchThread(threadId: string | null) {
  try {
    connectToDB();

    if(!threadId){
      const threads = await Thread.find({});
      return threads;
    }else{
      const thread = await Thread.findById(threadId);
      return thread;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function commentToThread({
  text,
  author,
  threadId,
  path,
}: {
  text: string;
  author: string;
  threadId: string;
  path: string;
}) {
  try {
    connectToDB();

    const commentData = {
      text: text,
      authorId: author,
      parentId: threadId,
      path: path,
    };
    const commentThread = await createThread(commentData);
    console.log("Comment created: ", commentThread);

    const updatedParentThread = await Thread.findByIdAndUpdate(
      threadId,
      { $push: { children: commentThread._id } },
      { new: true }
    );
    console.log("Updated parent thread: ", updatedParentThread);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function likeThread({
  userId,
  threadId,
}: {
  userId: string;
  threadId: string;
}) {
  try {
    connectToDB();

    const updatedThread = await Thread.findByIdAndUpdate(
      threadId,
      { $push: { likedBy: userId } },
      { new: true }
    );
    console.log("UpdatedThread: ", updatedThread);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { likedThread: threadId } },
      { new: true }
    );
    console.log("UpdatedUser: ", updatedThread);

    console.log(`${threadId} liked by ${userId}`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
