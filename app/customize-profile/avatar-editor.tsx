"use client";

import { cn, convertFileToBase64Url } from "@/lib/utils";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";

type Prop = {
  avatar: string | File | null;
  setAvatar: Dispatch<SetStateAction<string | File | null>>;
  session: Session;
  isAvatarChanged: boolean;
  setIsAvatarChanged: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
};

export function AvatarEditor({
  avatar,
  setAvatar,
  session,
  setIsAvatarChanged,
  isLoading,
}: Prop) {
  // file input ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // for picture preview
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    avatar as string | null
  );

  // obtain picture from google provider
  const googleAvatar = session.user.image as string;

  function choosePictureTrigger() {
    fileInputRef.current?.click();
  }

  async function pictureChosenHandler(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    // set avatar value to the file
    const file = e.target.files[0];
    setAvatar(file);

    // for avatar preview
    const base64Url = await convertFileToBase64Url(file);
    setAvatarUrl(base64Url);

    // mark changes
    setIsAvatarChanged(true);
  }

  function importFromGoogleHandler() {
    setAvatar(googleAvatar);
    setAvatarUrl(googleAvatar);

    // mark changes
    setIsAvatarChanged(true);
  }

  function removeCurrentPictureHandler() {
    setAvatar(null);
    setAvatarUrl(null);

    // mark changes
    setIsAvatarChanged(true);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger disabled={isLoading}>
          <img
            className={cn(
              "w-24 h-24 rounded-full object-cover object-center",
              isLoading ? "opacity-80" : ""
            )}
            src={avatarUrl || "/user.svg"}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Avatar</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={choosePictureTrigger} disabled={isLoading}>
            Choose a picture
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={importFromGoogleHandler}
            disabled={isLoading}
          >
            Import from google
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {!!avatar ? (
            <DropdownMenuItem
              className="text-red-500"
              onClick={removeCurrentPictureHandler}
              disabled={isLoading}
            >
              Remove Current Picture
            </DropdownMenuItem>
          ) : (
            <></>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* file input */}
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
    </>
  );
}
