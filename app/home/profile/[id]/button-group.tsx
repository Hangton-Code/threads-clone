import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Session } from "next-auth";
import Link from "next/link";
import { ShareDialog } from "@/components/share-dialog";
import { followAction, unfollowAction } from "@/lib/followActions";

export function ButtonGroup({
  user,
  session,
  isFollowed,
}: {
  user: User;
  session: Session;
  isFollowed: boolean;
}) {
  if (user.id === session.user.id) return <MyButtonGroup user={user} />;
  return (
    <OthersButtonGroup user={user} session={session} isFollowed={isFollowed} />
  );
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

function MyButtonGroup({ user }: { user: User }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant={"secondary"} asChild>
        <Link href="/customize-profile">Edit Profile</Link>
      </Button>
      <ShareDialog
        trigger={
          <Button variant={"secondary"} className="w-full" asChild>
            <div>Share Profile</div>
          </Button>
        }
        url={`${SITE_URL}/home/profile/${user.id}`}
      />
    </div>
  );
}

async function OthersButtonGroup({
  user,
  session,
  isFollowed,
}: {
  user: User;
  session: Session;
  isFollowed: boolean;
}) {
  if (!isFollowed)
    return (
      <form className="w-full grid" action={followAction}>
        <input
          name="user_to_be_followed_id"
          defaultValue={user.id}
          className="hidden"
        />
        <input
          name="revalidate_path"
          defaultValue={`/home/profile/${user.id}`}
          className="hidden"
        />
        <Button type="submit">Follow</Button>
      </form>
    );
  return (
    <form className="w-full grid" action={unfollowAction}>
      <input
        name="user_to_be_unfollowed_id"
        defaultValue={user.id}
        className="hidden"
      />
      <input
        name="revalidate_path"
        defaultValue={`/home/profile/${user.id}`}
        className="hidden"
      />
      <Button type="submit" variant={"outline"}>
        Following
      </Button>
    </form>
  );
}
