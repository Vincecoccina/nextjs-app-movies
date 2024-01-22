"use client";

import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Comments() {
  const [content, setContent] = useState("");
  const { data: session, status } = useSession();
  const onSubmit = () => {};
  return (
    <div className="mt-10">
      <h3 className="text-[20px] font-bold text-black dark:text-slate-500 mb-3">
        Commentaires
      </h3>
      {/* FORMULAIRE */}
      {session ? (
        <div className="mt-2 mb-6">
          <div>
            <Textarea
              placeholder="Ecrire un commentaire..."
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button disabled={content === ""} className="mt-3" onClick={onSubmit}>
            Envoyer
          </Button>
        </div>
      ) : (
        <div className="mt-2 mb-6">
          <div className="flex items-center justify-center w-[100%] h-[80px] px-4 py-4 bg-gray-600 rounded">
            <p>Vous devez être connecté pour poster un commentaires</p>
          </div>
          <Button className="mt-3"><Link href="/login">Me connecter</Link></Button>
        </div>
      )}
      
      {/* COMMENTS LIST */}

    </div>
  );
}
