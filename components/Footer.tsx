"use client";
import React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import PageContainer from "./PageContainer";

export default function Footer() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };

  return (
    <div className="p-4 border-t">
      <PageContainer>
        <div className="flex items-center justify-between">
          <a href="/">
            <Image
              src="/img/logo_noir.png"
              alt="Uncut"
              width={100}
              height={50}
              className="dark:invert"
            />
          </a>
        </div>
      </PageContainer>
    </div>
  );
}
