import Image from "next/image";
// import logo from "../../public/assets/logo.svg";
import logo from "@/public/assets/social-media-icons.jpg";
import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
  OrganizationSwitcher,
  SignOutButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function TopBar() {
  return (
    <div className="flex justify-between items-center w-full py-2 px-6 bg-[#15171B]">
      <div className="flex items-center gap-2">
        <div
          className="flex rounded-full overflow-hidden text-white"
          style={{ width: "40px", height: "40px" }}
        >
          <Image
            src={logo}
            alt="User Image"
            height={85}
            width={85}
            priority={true}
            style={{ width: "100%", height: "100%", objectFit: "cover"}}
          />
        </div>
        <h1 className="font-extrabold text-lg">SocialX</h1>
      </div>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </div>
  );
}
