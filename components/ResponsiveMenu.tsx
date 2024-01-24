"use client";

import { Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { Film, Popcorn, ChevronRightSquare, Settings } from "lucide-react";
import { Input } from "./ui/input";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResponsiveMenu() {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.replace(`/result?search=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false)
    }
  };

  return (
    <Sheet open={isOpen}>
      <SheetTrigger>
        <Menu className="h-6 w-6" onClick={() => setIsOpen(true)} />
      </SheetTrigger>
      <SheetContent side="left" onClick={() => setIsOpen(false)}>
        <div className="flex flex-col items-center h-[100%]">
          <ul className="flex flex-col justify-center my-2 gap-7 w-[100%] h-[100%] text-gray-400">
            <div className="flex items-center gap-6">
              <Search />
              <Input
                placeholder="Recherche..."
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Link
              href="/movies/all?limit=all"
              className="flex items-center gap-6 text-[18px] hover:text-white"
            >
              <Popcorn />
              Films
            </Link>
            <Link
              href="/movies/new?limit=all&visibility=1"
              className="flex items-center gap-6 text-[18px] hover:text-white"
            >
              <Film />
              Nouveautés
            </Link>
            <Link
              href="/movies/next?limit=all&visibility=2"
              className="flex items-center gap-6 text-[18px] hover:text-white"
            >
              <ChevronRightSquare />
              Prochainement
            </Link>
            <Link
              href="/"
              className="flex items-center gap-6 text-[18px] hover:text-white"
            >
              <Settings />
              Paramètres
            </Link>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
