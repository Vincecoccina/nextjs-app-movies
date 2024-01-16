import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Mail } from "lucide-react";

export default function loginPage() {
  return (
    <PageContainer>
      <div className="p-10">
        <h1 className="text-4xl font-bold text-center mb-10">Connexion</h1>
        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          <Button>
            <Github />
            Signin with Github
          </Button>
          <Button>
            <Mail />
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
