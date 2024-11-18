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
    await connectToDB();

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
    await connectToDB();

    if (!threadId) {
      const threads = await Thread.find({});
      return threads;
    } else {
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
    await connectToDB();

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

export async function toggleLike(
  userId: string,
  threadId: string,
  liked: boolean
) {
  try {
    await connectToDB();

    if (liked) {
      // like the thread
      await Thread.findByIdAndUpdate(
        threadId,
        { $push: { likedBy: userId } },
        { new: true }
      );

      await User.findByIdAndUpdate(
        userId,
        { $push: { likedThread: threadId } },
        { new: true }
      );

      console.log(`${threadId} liked by ${userId}`);
    } else {
      // dislike the thread
      await Thread.findByIdAndUpdate(threadId, {
        $pull: { likedBy: userId },
      });

      await User.findByIdAndUpdate(userId, {
        $pull: { likedThread: threadId },
      });

      console.log(`${threadId} disliked by ${userId}`);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
