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

  const resetPass = async () => {};

  return (
    <PageContainer>
      <div className="p-10 w-[30%] mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-5">
          Quel est votre e-mail ?
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
        <div className="relative my-2 h-5">
          <div className="absolute top-[50%] w-[100%] h-[1px] bg-slate-600 z-5"></div>
          <p className="flex items-center justify-center w-[10%] h-full left-[50%] translate-x-[-50%] absolute bg-slate-950 z-10 text-center">
            ou
          </p>
        </div>
        <div className="flex items-center justify-center text-[12px] gap-2 font-semibold">
          <Link href="/login" className="text-blue-500">
            Connectez-vous
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
