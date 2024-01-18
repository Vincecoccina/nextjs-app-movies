import { Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { Film, Popcorn, ChevronRightSquare, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ResponsiveMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col items-center h-[100%]">
          <ul className="flex flex-col justify-center my-2 gap-7 w-[100%] h-[100%] text-gray-400">
            <div className="flex items-center gap-6">
              <Search />
              <Input placeholder="Recherche..." />
            </div>
            <Link
              href="/"
              className="flex items-center gap-6 text-[18px] hover:text-white"
            >
              <Popcorn />
              Films
            </Link>
            <Link
              href="/"
              className="flex items-center gap-6 text-[18px] hover:text-white"
            >
              <Film />
              Nouveautés
            </Link>
            <Link
              href="/"
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
          <Button variant="destructive">Se deconnecter</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
