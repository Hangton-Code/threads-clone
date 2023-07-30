import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function Header() {
  return (
    <div>
      <div className="flex justify-center py-3">
        <Image src={"/threads_logo.png"} alt="" width={36} height={36} />
      </div>
      <Separator />
    </div>
  );
}
