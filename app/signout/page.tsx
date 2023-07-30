import { getServerSession } from "next-auth";
import { SignOutButton } from "./signOutButton";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { db } from "@/lib/db";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

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
              <Avatar className="absolute right-0 top-0">
                <AvatarImage
                  src={
                    dbUser.avatar_type === "File"
                      ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_96,h_96/${dbUser.avatar_value}`
                      : dbUser.avatar_type === "Url"
                      ? (dbUser.avatar_value as string)
                      : `/user.svg`
                  }
                  alt=""
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
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
