import { ReplyDialog } from "@/components/reply-dialog";
import { Separator } from "@/components/ui/separator";
import { getAvatarUrl } from "@/lib/utils";
import { Thread, User } from "@prisma/client";
import { Session } from "next-auth";
import Image from "next/image";

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
                src={getAvatarUrl({
                  avatar_type: sessionUser.avatar_type,
                  avatar_value: sessionUser.avatar_value,
                  width: 30,
                  height: 30,
                })}
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
