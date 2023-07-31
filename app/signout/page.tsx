import { getServerSession } from "next-auth";
import { SignOutButton } from "./sign-out-button";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { db } from "@/lib/db";
import { UserAvatar } from "@/components/user-avatar";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export default async function SignOutPage() {
  const session = await getServerSession(authOptions);

  // check if signin
  if (!session) redirect(`/signin?callbackUrl=${SITE_URL}/home`);

  // get avatar
  const dbUser = await db.user.findFirstOrThrow({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <div className="container h-full grid grid-rows-[1fr_min-content] py-8 ">
      <div className="flex flex-col justify-center items-center relative">
        {/* avatar */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <UserAvatar
                className="absolute right-0 top-0"
                avatar_type={dbUser.avatar_type}
                avatar_value={dbUser.avatar_value}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{session.user.email}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* content */}
        <img src={"/threads_logo.png"} alt="" />
        <p className="mt-4 text-2xl font-semibold">
          Confirm to <span className="text-red-500">Sign Out</span>?
        </p>
      </div>
      <SignOutButton />
    </div>
  );
}
