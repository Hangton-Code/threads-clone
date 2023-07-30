import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Session, getServerSession } from "next-auth";
import { NewThreadForm } from "./form";

export default async function NewPage() {
  const session = (await getServerSession(authOptions)) as Session;
  const dbUser = await db.user.findFirstOrThrow({
    where: { id: session.user.id },
  });

  return (
    <div className="h-full grid grid-rows-[min-content_1fr]">
      <div>
        <h2 className="text-center py-3 font-semibold text-lg">New thread</h2>
        <Separator />
      </div>
      <NewThreadForm user={dbUser} session={session} />
    </div>
  );
}
