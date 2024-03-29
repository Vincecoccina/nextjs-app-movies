"use client";

import { useState, useEffect } from "react";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";

type UserType = {
  email: string;
};

export default function ResetPasswordPage({ params }: any) {
  const router = useRouter();
  const [passwordIsVisisle, setPasswwordIsVisible] = useState(false);
  const [confirmPasswordIsVisisle, setConfirmPasswwordIsVisible] =
    useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("/api/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: params.token }),
        });

        if (response.status === 400) {
          setError("Token invalide ou token expiré");
          setVerified(true);
        }
        if (response.status === 200) {
          setError("");
          setVerified(true);
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        setError("Erreur, réessayer");
      }
    };
    verifyToken();
  }, [params.token]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email: user?.email }),
      });

      if (response.status === 400) {
        setError("Cet Email n'existe pas");
      }
      if (response.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Erreur, réessayer");
    }
  };

  return (
    <PageContainer>
      <h1 className="text-3xl font-semibold mb-3 mt-10 text-center">
        Reinitialisez votre mot de passe
      </h1>
      <div className="p-5 w-[30%] mx-auto">
        <form className="mx-auto flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={!passwordIsVisisle ? "password" : "text"}
              placeholder="Votre nouveau mot de passe"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Eye
              size={20}
              className="absolute right-[-30px] top-[50%] translate-y-[-50%] text-gray-400 cursor-pointer"
              onClick={() => setPasswwordIsVisible((prev) => !prev)}
            />
          </div>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={!confirmPasswordIsVisisle ? "password" : "text"}
              placeholder="Confirmez votre nouveau mot de passe"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Eye
              size={20}
              className="absolute right-[-30px] top-[50%] translate-y-[-50%] text-gray-400 cursor-pointer"
              onClick={() => setConfirmPasswwordIsVisible((prev) => !prev)}
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-500 text-white font-semibold hover:bg-blue-400"
          >
            Réinitialiser mon mot de passe
          </Button>
          {error != "" && <p className="text-center text-red-500">{error}</p>}
        </form>
      </div>
    </PageContainer>
  );
}
