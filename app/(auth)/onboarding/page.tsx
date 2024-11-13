import AccountProfile from "@/components/Forms/AccountProfile";
import { fetchUserDetails } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import mongoose from "mongoose";

interface UserInfoType {
  id: string;
  _id: typeof mongoose.Schema.ObjectId;
  name: string;
  username: string;
  bio: string;
  image: string;
}

export default async function onBoardingPage() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo: UserInfoType = await fetchUserDetails(user.id);

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    name: userInfo?.name || user?.firstName,
    username: userInfo?.username || user?.username || "",
    image: userInfo?.image || user?.imageUrl,
    bio: userInfo?.bio || "",
  };

  return (
    <main className="w-full sm:w-1/2 h-full flex flex-col gap-y-8 items-center p-6">
      <div className="w-full flex flex-col gap-y-2">
        <h1 className="font-bold text-2xl">Onboarding</h1>
        <p>Complete your profile to use thread.</p>
      </div>
      <section className="bg-[#0C0D11]  w-full rounded-md p-4 sm:p-8">
        <AccountProfile
          data={JSON.parse(JSON.stringify(userData))}
          btntype="continue"
        />
      </section>
    </main>
  );
}
