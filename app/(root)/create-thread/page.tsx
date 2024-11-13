import PostThread from "@/components/Forms/PostThread";
import { fetchUserDetails } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

export default async function CreateThread() {
  const user = await currentUser();
  if (!user) return null;

  const userDetails = await fetchUserDetails(user.id);
  if (!userDetails._id) return null;

  return (
    <main className="w-full flex justify-center items-center">
      <PostThread authorId={userDetails._id} />
    </main>
  );
}
