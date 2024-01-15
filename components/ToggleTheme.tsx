"use client";
import React, {useState} from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export default function ToggleTheme() {
  const {theme, setTheme} = useTheme()
 

  const toggleTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark")
  }

  return (
    <>
      <div className="flex items-center">
          {theme != "dark" && <Moon className="h-6 w-6" onClick={toggleTheme} />}
          {theme === "dark" && <Sun className="h-6 w-6" onClick={toggleTheme} />}
      </div>
    </>
  );
}
