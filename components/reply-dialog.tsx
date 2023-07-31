"use client";

import { Thread, User } from "@prisma/client";
import { Session } from "next-auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewThreadForm } from "./new-thread/form";
import { ReactNode } from "react";

export function ReplyDialog({
  thread,
  session,
  author,
  trigger,
  sessionUser,
  triggerClassName,
}: {
  thread: Thread;
  session: Session;
  author: User;
  trigger: ReactNode;
  sessionUser: User;
  triggerClassName?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Reply to{" "}
            <span className="underline-offset-2 underline">
              {author.user_name}
            </span>
          </DialogTitle>
        </DialogHeader>
        <NewThreadForm
          reply_to={thread}
          session={session}
          user={sessionUser}
          reply_to_author={author}
        />
      </DialogContent>
    </Dialog>
  );
}
