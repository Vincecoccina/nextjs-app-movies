"use client";

import React, { SyntheticEvent, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMutation } from "react-query";
import axios from "axios";
import { Comment } from "@prisma/client";
import { useComments } from "@/hooks/useComments";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CommentWithUser } from "@/type";
import { MessageCircle } from "lucide-react";

export default function Comments({ movieSlug }: { movieSlug: string }) {
  const [content, setContent] = useState("");
  const { data: session, status } = useSession();

  /* Create Comment */
  const createComment = (newComment: Partial<Comment>) => {
    return axios.post("/api/comment", newComment).then((res) => res.data);
  };

  const { mutate, isLoading } = useMutation(createComment, {
    onSuccess: (data: Comment) => {
      console.log("Votre commentaitre à bien été créé", data);
    },
  });

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    mutate({ content, movieSlug });
  };

  /* Get Comments */
  const { data: comments, isFetching } = useComments(movieSlug);

  return (
    <div className="mt-10">
      <h3 className="flex items-center gap-3 text-[20px] font-bold text-black dark:text-slate-500 mb-3">
        <MessageCircle/>
        Commentaires
      </h3>

      {/* FORMULAIRE */}
      {session ? (
        <div className="mt-2 mb-6 bg-slate-300 py-4 px-4 rounded-lg">
          <div>
            <Textarea
              placeholder="Ecrire un commentaire..."
              onChange={(e) => setContent(e.target.value)}
              className="bg-slate-100 border-none text-[#333] resize-none"
            />
          </div>
          <Button
            disabled={content === "" || isLoading}
            className="mt-3 bg-slate-700 text-white"
            onClick={onSubmit}
          >
            {isLoading ? "Envoi du commentaire" : "Envoyer"}
          </Button>
        </div>
      ) : (
        <div className="mt-2 mb-6">
          <div className="flex items-center justify-center w-[100%] h-[80px] px-4 py-4 bg-gray-600 rounded">
            <p>Vous devez être connecté pour poster un commentaires</p>
          </div>
          <Button className="mt-3">
            <Link href="/login">Me connecter</Link>
          </Button>
        </div>
      )}

      {/* COMMENTS LIST */}
      <div className="flex flex-col gap-3 bg-slate-300 py-4 px-4 rounded-lg">
        <h4 className="text-slate-700 font-semibold">Derniers commentaires</h4>
        {isFetching ? (
          <p>Chargements des commentaires</p>
        ) : (
          comments.map((comment: CommentWithUser) => (
            <div
              className="flex flex-col gap-3 bg-slate-100 py-4 px-4 rounded"
              key={comment.id}
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={comment.user.image || "/image/avatar_user.png"}
                  />
                  <AvatarFallback>{comment.user.name}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-[#333]">
                    {comment.user.name}
                  </p>
                  <p className="font-semibold text-[#333] text-xs">
                    Ajouté le :{" "}
                    <span className="text-slate-700 font-bold">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-[#333]">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
