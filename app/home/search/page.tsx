import { db } from "@/lib/db";
import { People } from "./[query]/people";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function SearchPage() {
  const session = (await getServerSession(authOptions)) as Session;

  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const following = await db.friendship.findMany({
    where: {
      user_requested_to_follow_id: session.user.id,
    },
  });

  const revalidate_path = "/home/search";

  return (
    <div className="overflow-auto">
      {users.map((user, i) => {
        return (
          <People
            key={i}
            user={user}
            sessionUserFollowings={following}
            revalidate_path={revalidate_path}
          />
        );
      })}
    </div>
  );
}
