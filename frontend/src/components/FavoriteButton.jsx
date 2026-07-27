"use client";

import { Heart } from "lucide-react";
import useFavorites from "@/hooks/useFavorites";

export default function FavoriteButton({ movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(movie.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log(movie);


        toggleFavorite(movie);
      }}
      className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/70"
    >
      <Heart
        size={24}
        className={`transition-all duration-300 ${
          favorite
            ? "fill-red-500 text-red-500 scale-110"
            : "text-white hover:text-red-400"
        }`}
      />
    </button>
  );
}