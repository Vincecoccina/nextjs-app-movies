import React from "react";
import PageContainer from "./PageContainer";
import Link from "next/link";
import { LINKS } from "@/utils/Link";
import ProfileButton from "./ProfileButton";
import ResponsiveMenu from "./ResponsiveMenu";
import ToggleTheme from "./ToggleTheme";

export default function Navbar() {
  return (
    <header className="p-4 border-b">
      <PageContainer>
        <nav className="flex items-center justify-between w-full">
          <div className="flex items-center gap-5">
            <ResponsiveMenu />
            <Link href="/">
              <h1 className="text-2xl font-bold text-black dark:text-white">
                Uncut
              </h1>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <ToggleTheme />
            <ProfileButton />
          </div>
        </nav>
      </PageContainer>
    </header>
  );
}
