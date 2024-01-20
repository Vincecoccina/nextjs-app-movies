"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export default function ProfileButton() {
  const { data, status } = useSession();

  return (
    <div className="flex items-center gap-3">
      {status === "unauthenticated" ? (
        <Link href="/login" className="text-[12px] font-semibold">
          S'identifier / S'inscrire
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={data?.user?.image || "/img/avatar_user.png"} />
              <AvatarFallback>{data?.user?.name}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{`Bonjour ${data?.user?.name}`}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mon Compte</DropdownMenuItem>
            <DropdownMenuItem>Mon abonnement</DropdownMenuItem>
            <DropdownMenuItem>Souscrire</DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant="destructive" onClick={() => signOut()}>
                Se deconnecter
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
