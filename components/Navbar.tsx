"use client";
import React from "react";
import PageContainer from "./PageContainer";
import ProfileButton from "./ProfileButton";
import ResponsiveMenu from "./ResponsiveMenu";
import Image from "next/image";
import dynamic from "next/dynamic";

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
            <ProfileButton />
          </div>
        </nav>
      </PageContainer>
    </header>
  );
}
