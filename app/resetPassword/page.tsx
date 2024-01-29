"use client";

import { SyntheticEvent, useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await resetPass();
  };

  const resetPass = async () => {
    
  };

  return (
    <PageContainer>
      <div className="p-10 w-[30%] mx-auto">
        <h1 className="text-4xl font-semibold text-center mb-5">
          Quelle est votre adresse e-mail ?
        </h1>
        <form
          className="mx-auto flex flex-col gap-2"
          onSubmit={handleFormSubmit}
        >
          <div>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-500 text-white font-semibold hover:bg-blue-400"
          >
            Valider
          </Button>
        </form>
      </div>
    </PageContainer>
  );
}
