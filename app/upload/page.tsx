"use client";

import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/hooks/useCategories";
import { slugify } from "@/utils/Slugify";
import { Category, Movie } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { formatLink } from "@/utils/TrimLink";

export default function page() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [director, setDirector] = useState("");
  const [casting, setCasting] = useState("");
  const [trailer, setTrailer] = useState("");
  const [warning, setWarning] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [visibility, setVisibility] = useState(0);
  const [rate, setRate] = useState(0);
  const [coverImg, setCoverImg] = useState("");
  const [heroImg, setHeroImg] = useState("");
  const [torrent, setTorrent] = useState("");
  const [review, setReview] = useState("");

  const { data: categories, isFetching } = useCategories();
  const router = useRouter();

  const createMovie = (newMovie: Partial<Movie>) =>
    axios.post("api/movies", newMovie).then((res) => res.data);

  const { mutate, isLoading } = useMutation(createMovie, {
    onSuccess: (data: Movie) => {
      router.push(`/movies/${data.slug}`);
    },
  });

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (
      !session ||
      session?.user?.email != process.env.NEXT_PUBLIC_EMAIL_ADMIN
    ) {
      router.replace("/");
    }
  }, [session, status, router]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await mutate({
      title,
      year,
      country,
      synopsis,
      director,
      casting,
      trailer,
      warning,
      visibility,
      rate,
      catSlug,
      slug: slugify(title),
      coverImg,
      heroImg,
      file: formatLink(torrent),
      review,
    });
  };

  return (
    <PageContainer>
      <main className="p-10">
        <h1 className="text-4xl font-bold text-center mb-10">
          Ajout d'un film
        </h1>
        <form className="w-[50%] mx-auto">
          {/* Cover */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Image de la jacquette"
              onChange={(e) => setCoverImg(e.target.value)}
            />
          </div>

          {/* Hero */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Image du hero"
              onChange={(e) => setHeroImg(e.target.value)}
            />
          </div>

          {/* Title */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Titre"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Year */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Année"
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          {/* Country */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Pays"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          {/* Director */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Réalisateur"
              onChange={(e) => setDirector(e.target.value)}
            />
          </div>

          {/* Casting */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Casting"
              onChange={(e) => setCasting(e.target.value)}
            />
          </div>

          {/* Synopsis */}
          <div className="mb-4">
            <Textarea
              placeholder="Synopsis"
              onChange={(e) => setSynopsis(e.target.value)}
            />
          </div>

          {/* Review */}
          <div className="mb-4">
            <Textarea
              placeholder="Avis"
              onChange={(e) => setReview(e.target.value)}
            />
          </div>

          {/* Rate */}
          <div className="mb-4">
            <Input
              type="number"
              placeholder="Note sur 10"
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </div>

          {/* Trailer */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Trailer"
              onChange={(e) => setTrailer(e.target.value)}
            />
          </div>

          {/* warnings - select */}
          <div className="mb-4">
            <Select onValueChange={(value) => setWarning(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Avertissement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tous publics">Tous publics</SelectItem>
                <SelectItem value="Interdit aux moins de 12 ans">
                  Interdit aux moins de 12 ans
                </SelectItem>
                <SelectItem value="Interdit aux moins de 16 ans">
                  Interdit aux moins de 16 ans
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category - select */}
          <div className="mb-4">
            {isFetching ? (
              <p>Chargement des catégories</p>
            ) : (
              <Select onValueChange={(value) => setCatSlug(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category: Category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Visibility */}
          <div className="mb-4">
            <Input
              type="number"
              placeholder="Visibilité"
              onChange={(e) => setVisibility(Number(e.target.value))}
            />
          </div>

          {/* Torrent */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Fichier à télécharger"
              onChange={(e) => setTorrent(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Button
              disabled={isLoading}
              className="bg-blue-700 text-white w-full font-semibold"
              onClick={handleSubmit}
            >
              {isLoading ? "Création de la fiche film" : "Valider"}
            </Button>
          </div>
        </form>
      </main>
    </PageContainer>
  );
}
