import React from "react";
import PageContainer from "./PageContainer";


export default function Footer() {
  return (
    <div className="p-4 border-t">
      <PageContainer>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Next Blog
          </h1>
        </div>
      </PageContainer>
    </div>
  );
}
