import ThreadCard from "@/components/Cards/ThreadCard";
import { fetchThread } from "@/lib/actions/thread.action";
import { fetchUserById, fetchUserDetails } from "@/lib/actions/user.action";
import { ThreadDataType, UserDataType } from "@/lib/types";
import { currentUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  const userInfo: UserDataType = await fetchUserDetails(user!.id);

  const threads: ThreadDataType[] = await fetchThread(null);

  const authorIds = [...new Set(threads.map((item) => item.author))];

  const authorDataMap = await Promise.all(
    authorIds.map(async (id) => {
      const authorData = await fetchUserById(id);
      return { id, data: authorData };
    })
  ).then((results) => {
    return results.reduce((acc, { id, data }) => {
      acc[id] = data;
      return acc;
    }, {} as Record<string, any>);
  });

  const threadWithAuthorInfo = threads.map((item) => ({
    threadData: item,
    authorData: authorDataMap[item.author],
  }));

  return (
    <main className="w-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-y-4 p-4 md:p-0 mt-0 w-full max-h-[85%] overflow-y-auto rounded-lg">
        {threadWithAuthorInfo.map((item) => (
          <ThreadCard
            key={item.threadData._id}
            authorData={item.authorData}
            threadData={item.threadData}
            userId={userInfo._id}
          />
        ))}
      </div>
    </main>
  );
}
