import ThreadCard from "@/components/Cards/ThreadCard";
import { fetchThread } from "@/lib/actions/thread.action";
import { fetchUserById } from "@/lib/actions/user.action";
import { ThreadDataType } from "@/lib/types";

export default async function Home() {
  const threads: ThreadDataType[] = await fetchThread(null);

  const threadWithAuthorInfo = await Promise.all(
    threads.map(async (item) => {
      const authorData = await fetchUserById(item.author);

      return { threadData: item, authorData: authorData };
    })
  );

  console.log(threads);
  return (
    <main className="w-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-y-4 p-4 md:p-0 mt-0 w-full max-h-[85%] overflow-y-auto rounded-lg">
        {threadWithAuthorInfo.map((item) => <ThreadCard key = {item.threadData._id} authorData = {item.authorData} threadData = {item.threadData}/>)}
      </div>
    </main>
  );
}
