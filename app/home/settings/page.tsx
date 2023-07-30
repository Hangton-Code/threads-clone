import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="container h-full flex flex-col justify-between gap-4 pt-10 overflow-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Setting</h1>
      </div>
      <Button
        className="text-red-500 hover:text-red-500 w-full"
        variant={"outline"}
        asChild
      >
        <Link href={"/signout"}>Sign Out Form This Device</Link>
      </Button>
    </div>
  );
}
