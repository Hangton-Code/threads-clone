"use client";

import { useState } from "react";
import { AvatarEditor } from "./avatar-editor";
import { NameEditor } from "./name-editor";
import { Button } from "@/components/ui/button";
import { useSubmit } from "./useSubmit";
import { Session } from "next-auth";
import { User } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function CustomizeProfileForm({
  user,
  session,
}: {
  user: User;
  session: Session;
}) {
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const [avatar, setAvatar] = useState<File | string | null>(
    user.isProfileCustomized
      ? user.avatar_type === "File"
        ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_96,h_96/${user.avatar_value}`
        : user.avatar_value
      : null
  );
  const [displayName, setDisplayName] = useState(
    user.isProfileCustomized ? user.display_name : ""
  );
  const [userName, setUserName] = useState(
    user.isProfileCustomized ? user.user_name : ""
  );
  const [bio, setBio] = useState(user.isProfileCustomized ? user.bio : "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useSubmit(
    avatar,
    isAvatarChanged,
    displayName,
    userName,
    bio,
    setIsLoading,
    setError,
    session
  );
  return (
    <form
      className="w-full flex flex-col items-center gap-8"
      onSubmit={onSubmit}
    >
      {/* avatar */}
      <AvatarEditor
        avatar={avatar}
        setAvatar={setAvatar}
        session={session}
        isAvatarChanged={isAvatarChanged}
        setIsAvatarChanged={setIsAvatarChanged}
        isLoading={isLoading}
      />
      {/* name */}
      <NameEditor
        displayName={displayName}
        setDisplayName={setDisplayName}
        userName={userName}
        setUserName={setUserName}
        isLoading={isLoading}
      />

      {/* bio */}
      <div className="w-full max-w-xs flex flex-col mx-auto gap-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Type your bio here."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="h-32 resize-none"
          disabled={isLoading}
        />
      </div>

      {/* submit */}
      <Button className="w-full max-w-xs" type="submit">
        {isLoading ? (
          <Image
            src={"/loading-bg-primary.svg"}
            alt=""
            width={22}
            height={22}
          />
        ) : (
          <></>
        )}
        Save Changes
      </Button>
      {/* error message */}
      {error ? (
        <p className="leading-none text-sm text-red-500">{error}</p>
      ) : (
        <></>
      )}
    </form>
  );
}
