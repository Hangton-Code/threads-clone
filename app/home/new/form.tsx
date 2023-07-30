"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@prisma/client";
import { ChangeEvent, useRef, useState } from "react";
import { useSubmit } from "./use-submit";
import { Session } from "next-auth";
import { convertFileToBase64Url } from "@/lib/utils";
import Image from "next/image";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function NewThreadForm({
  user,
  session,
}: {
  user: User;
  session: Session;
}) {
  // file input ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useSubmit(
    content,
    attachment,
    setIsLoading,
    setError,
    session
  );

  function fileInputTrigger() {
    fileInputRef.current?.click();
  }

  async function pictureChosenHandler(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    // set attachment value to the file
    const file = e.target.files[0];
    setAttachment(file);

    // for attachment preview
    const base64Url = await convertFileToBase64Url(file);
    setAttachmentUrl(base64Url);
  }

  function removeAttachmentHandler() {
    setAttachment(null);
    setAttachmentUrl(null);
  }

  return (
    <form
      className="container h-full flex flex-col justify-between pt-8"
      onSubmit={onSubmit}
    >
      <div className="flex gap-4 overflow-visible">
        {/* avatar */}
        <div className="grid grid-rows-[min-content_1fr] gap-2">
          <Avatar>
            <AvatarImage
              src={
                user.avatar_type === "File"
                  ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_96,h_96/${user.avatar_value}`
                  : user.avatar_type === "Url"
                  ? (user.avatar_value as string)
                  : `/user.svg`
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="h-full w-[2px] bg-slate-100 mx-auto" />
        </div>

        {/* name, textarea and attachment*/}
        <div className="w-full flex flex-col gap-2 overflow-visible">
          <p className="font-medium leading-none">{user.user_name}</p>
          <Textarea
            className="h-60"
            placeholder="Start a thread..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
          />
          {/* attachment */}
          {attachmentUrl ? (
            <div className="relative">
              <img
                src={attachmentUrl}
                alt=""
                className="w-full aspect-square rounded object-cover object-center"
              />
              <Button
                variant={"secondary"}
                size={"icon"}
                className="absolute right-2 top-2"
                type="button"
                onClick={removeAttachmentHandler}
                disabled={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Button>
            </div>
          ) : (
            <Button
              variant={"ghost"}
              className="hover:bg-transparent text-slate-500"
              size={"icon"}
              type="button"
              onClick={fileInputTrigger}
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>
            </Button>
          )}
          {error ? <p className="text-red-500 text-sm">{error}</p> : <></>}
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Image
              src={"/loading-bg-primary.svg"}
              alt=""
              width={22}
              height={22}
            />
          ) : (
            "Post"
          )}
        </Button>
      </div>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept="image/png,image/jpeg,image/gif"
        onChange={pictureChosenHandler}
        onClick={(e) => {
          e.currentTarget.value = "";
        }}
      />
    </form>
  );
}
