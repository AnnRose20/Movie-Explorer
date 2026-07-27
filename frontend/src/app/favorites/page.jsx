"use client";

import useFavorites from "@/hooks/useFavorites";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <main className="min-h-screen bg-slate-950 pt-24 px-6">

      <div className="mx-auto max-w-7xl">

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-slate-800 px-5 py-3 text-white transition-all duration-300 hover:bg-red-600"
        >
          ← Back to Home
        </Link>

        <h1 className="mb-10 text-4xl font-bold text-white">
          ❤️ My Favorites
        </h1>

        {favorites.length === 0 ? (
          <div className="flex h-[50vh] items-center justify-center">

            <p className="text-xl text-gray-400">
              No favorite movies yet.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">

            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}

          </div>
        )}

      </div>

    </main>
  );
}