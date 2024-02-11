"use client";

import React, { useState, SyntheticEvent } from "react";
import getStripe from "@/lib/getStripe";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet } from "lucide-react";

export default function page() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleDonation = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const amountInCents = Math.round(Number(amount) * 100);

    try {
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amountInCents }),
      });

      const session = await response.json();

      // Obtenez l'instance de Stripe et redirigez vers la session de paiement
      const stripe = await getStripe();

      if (stripe) {
        stripe.redirectToCheckout({ sessionId: session.id });
      }
    } catch (error) {
      console.error("Erreur lors de la création de la session Stripe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <section className="flex flex-col items-center justify-center mt-6">
        <h1 className="text-[35px] font-semibold ">Faire un don</h1>
        <p className="w-[50%] mx-auto text-[13px] text-center text-gray-400 italic">
          Faire un don permet de faire la maintenance du site
        </p>
      </section>
      <section className="flex items-center w-[80%] h-[500px] mx-auto mt-6 rounded-lg">
        <div className="w-[50%] h-full flex items-center justify-center flex-col gap-4">
          <h3 className="font-semibold text-[20px] uppercase italic">
            Faire un don en euro
          </h3>
          <form onSubmit={handleDonation} className="w-[70%]">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                pattern="[0-9]*[.,]?[0-9]+"
                placeholder="Entrez votre montant"
                onChange={(e) => setAmount(parseFloat(e.target.value.replace(',', '.')))}
                className="py-2 text-center"
                min="0"
              />
              <Button className="flex items-center gap-2 bg-gradient-to-r from-fuchsia-700 to-pink-600  text-white hover:bg-cyan-400 uppercase font-semibold">
                <CreditCard />
                {isLoading ? "Traitement..." : "Faire un don"}
              </Button>
            </div>
          </form>
        </div>
        <div className="h-[50%] w-[2px] bg-slate-300"></div>
        <div className="flex items-center justify-center flex-col gap-4 w-[50%] h-full">
          <h3 className="font-semibold text-[20px] uppercase italic">
            Faire un don en crytomonnaie
          </h3>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-fuchsia-700 to-pink-600 text-white hover:bg-cyan-400 uppercase font-semibold w-[70%]">
            <Wallet />
            Connectez votre wallet
          </Button>
        </div>
      </section>
    </main>
  );
}
