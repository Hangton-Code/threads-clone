import { Friendship, User } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN;

export async function Profile({
  user,
  followers,
}: {
  user: User;
  followers: Friendship[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        {/* names */}
        <div>
          <h3 className="text-xl leading-snug font-bold">
            {user.display_name}
          </h3>
          <div className="flex items-center gap-1.5">
            <p>{user.user_name}</p>
            <Badge variant={"secondary"} className="text-xs font-normal">
              {SITE_DOMAIN}
            </Badge>
          </div>
        </div>
        {/* avatar */}
        <Image
          src={
            user.avatar_type === "File"
              ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_96,h_96/${user.avatar_value}`
              : user.avatar_type === "Url"
              ? (user.avatar_value as string)
              : `/user.svg`
          }
          alt=""
          width={"60"}
          height={"60"}
          className="rounded-full object-center object-cover"
        />
      </div>
      <p className="leading-snug whitespace-pre-line">{user.bio}</p>
      {/* followers number */}
      {followers.length > 0 ? (
        <p className="text-slate-500 leading-none indent-1">
          {followers.length > 1
            ? `${followers.length} followers`
            : "1 follower"}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}
