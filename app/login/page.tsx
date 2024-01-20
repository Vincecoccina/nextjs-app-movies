"use client";

import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";


export default function loginPage() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <PageContainer>
      <div className="p-10">
        <h1 className="text-4xl font-bold text-center mb-10">Connexion</h1>
        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          <Button
            onClick={() => signIn("google")}
            className="flex items-center gap-3 py-7 font-semibold"
          >
            <Image
              src="/img/google.png"
              width={30}
              height={30}
              alt="logo google"
            />
            Signin with Google
          </Button>
        </div>
        <Separator className="my-5 mx-auto w-[20%]" />
        <p className="text-[12px] text-center text-black dark:text-slate-300 cursor-pointer">
          Je n'ai pas de compte
        </p>
      </div>
    </PageContainer>
  );
}
