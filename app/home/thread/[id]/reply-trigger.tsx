import { ReplyDialog } from "@/components/reply-dialog";
import { Separator } from "@/components/ui/separator";
import { Thread, User } from "@prisma/client";
import { Session } from "next-auth";
import Image from "next/image";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function ReplyTrigger({
  thread,
  author,
  session,
  sessionUser,
}: {
  thread: Thread;
  author: User;
  session: Session;
  sessionUser: User;
}) {
  return (
    <div className="absolute w-full bottom-0 left-0 bg-white">
      <Separator />
      <ReplyDialog
        author={author}
        thread={thread}
        session={session}
        sessionUser={sessionUser}
        triggerClassName="w-full"
        trigger={
          <div className="w-full p-2">
            <div className="py-2 px-2.5 rounded-full w-full bg-gray-100 flex items-center gap-2">
              <Image
                src={
                  sessionUser.avatar_type === "File"
                    ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_96,h_96/${sessionUser.avatar_value}`
                    : sessionUser.avatar_type === "Url"
                    ? (sessionUser.avatar_value as string)
                    : `/user.svg`
                }
                alt=""
                width={"30"}
                height={"30"}
                className="rounded-full"
              />
              <p className="text-slate-500">Reply to {author.user_name}</p>
            </div>
          </div>
        }
      />
    </div>
  );
}
