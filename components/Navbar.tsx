"use client";
import React from "react";
import PageContainer from "./PageContainer";
import ProfileButton from "./ProfileButton";
import ResponsiveMenu from "./ResponsiveMenu";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";
import Link from "next/link";
import { Bitcoin, CreditCard } from "lucide-react";

const ToggleTheme = dynamic(() => import("./ToggleTheme"), { ssr: false });

export default function Navbar() {
  return (
    <header className="p-4 border-b">
      <PageContainer>
        <nav className="flex items-center justify-between w-full">
          <div className="flex items-center gap-5">
            <ResponsiveMenu />
            <a href="/">
              <span className="text-[25px] font-bold">Uncut vidéo</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <ToggleTheme />
            <Link
              href="/"
              className="flex items-center gap-1 rounded-[30px] py-2 px-4 text-[15px] text-slate-700 dark:text-white font-semibold bg-cyan-600 uppercase"
            >
              Faire un don
            </Link>

            <ProfileButton />
          </div>
        </nav>
      </PageContainer>
    </header>
  );
}
