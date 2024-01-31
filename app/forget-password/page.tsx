"use client";

import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
  
    if (!isValidEmail(email)) {
      setError("Email invalide");
      return;
    }

    try {
      const response = await fetch("/api/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if(response.status === 400){
        setError("Cet Email n'existe pas")
      }
      if(response.status === 200){
        setError("")
        router.push("/login")
      }

    } catch (error) {
      setError("Erreur, réessayer");
    }
  };

  return (
    <PageContainer>
      <div className="p-10 w-[30%] mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-5">
          Quel est votre e-mail ?
        </h1>
        <form className="mx-auto flex flex-col gap-2" onSubmit={handleSubmit}>
          <div>
            <Input id="email" name="email" type="email" placeholder="Email" />
          </div>
          {error != "" && (
            <p className="text-red-600 text-[16px] mb-4">{error}</p>
          )}
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
