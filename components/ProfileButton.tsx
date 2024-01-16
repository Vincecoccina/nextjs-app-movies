import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";


export default function ProfileButton() {
  return (
    <div className="flex items-center gap-3">
      <Link href="/login" className="text-[12px] font-semibold">S'identifier / S'inscrire</Link>
      <Avatar>
        <AvatarImage src="/img/avatar.jpeg" />
      </Avatar>
    </div>
  );
}
