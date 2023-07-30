import d from "@/lib/dayjs";
import { Thread, User } from "@prisma/client";
import { Session } from "next-auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteThreadAction } from "./actions/deleteThreadActions";
import Link from "next/link";

export function Header({
  thread,
  author,
  session,
  replying_to_author,
  revalidatePath,
  hyperlink,
}: {
  thread: Thread;
  author: User;
  session: Session;
  replying_to_author?: User;
  revalidatePath: string;
  hyperlink?: boolean;
}) {
  return (
    <div>
      <div className="w-full grid grid-cols-[max-content_1fr_max-content] items-center h-min">
        {hyperlink ? (
          <Link
            href={`/home/profile/${author.id}`}
            className="font-medium leading-none"
          >
            {author.user_name}
          </Link>
        ) : (
          <p className="font-medium leading-none">{author.user_name}</p>
        )}

        {hyperlink ? (
          <Link href={`/home/thread/${thread.id}`} className="w-full h-full" />
        ) : (
          <div></div>
        )}

        <div className="flex gap-1 items-center">
          <p className="text-slate-500 text-xs">
            {d().from(d(thread.createdAt), true)}
          </p>

          {author.id === session.user.id ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>More</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <form action={deleteThreadAction}>
                  <input
                    name="thread_to_be_deleted_id"
                    defaultValue={thread.id}
                    className="hidden"
                  />
                  <input
                    name="revalidate_path"
                    defaultValue={revalidatePath}
                    className="hidden"
                  />
                  <button type="submit" className="block p-0 w-full">
                    <DropdownMenuItem className="text-red-500">
                      Delete
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <></>
          )}
        </div>
      </div>
      {replying_to_author ? (
        <p className="text-slate-500 text-sm ">
          Replying to @{replying_to_author.user_name}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}
