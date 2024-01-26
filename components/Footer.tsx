"use client";
import React from "react";
import Image from "next/image";
import PageContainer from "./PageContainer";

export default function Footer() {
  return (
    <div className="p-4">
      <PageContainer>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="text-[12px] font-semibold text-center">
            <p className="mb-1">&copy; 2024 uncut - Tous droits réservés.</p>
            <p>
              Don bitcoin :{" "}
              <span className="text-slate-800 dark:text-orange-300">
                3EQppuiJWYgokwrgGCL38ZNHNj9QgowE2G
              </span>{" "}
            </p>
          </div>
          <a href="/" className="bg-green-500 rounded-full py-1 px-3">
            <Image
              src="/img/logo_noir.png"
              alt="Uncut"
              width={100}
              height={50}
              className="invert"
            />
          </a>
        </div>
      </PageContainer>
    </div>
  );
}
