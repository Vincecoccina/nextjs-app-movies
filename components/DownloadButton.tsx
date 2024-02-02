"use client";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Download, LogIn } from "lucide-react";
import Link from "next/link";

type Props = {
  link: string;
};

export default function DownloadButton({ link }: Props) {
  const { data } = useSession();
  if (data) {
    return (
      <a href={link} download>
        <Button className="flex items-center gap-3 cursor-pointer bg-green-700 text-white">
          <Download />
          Télécharger
        </Button>
      </a>
    );
  } else {
    return (
      <Link href="/login">
        <Button className="flex items-center gap-3 cursor-pointer bg-green-700 text-white">
          <LogIn />
          Connectez-vous pour télécharger
        </Button>
      </Link>
    );
  }
}
