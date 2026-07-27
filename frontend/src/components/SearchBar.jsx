"use client";

import { useEffect, useState } from "react";
import { searchMovies } from "@/services/movieService";
import MovieCard from "./MovieCard";

export default function SearchBar({ onSearching }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMovies() {
      if (!query.trim()) {
        setMovies([]);
        onSearching(false);
        return;
      }

      try {
        setLoading(true);

        const results = await searchMovies(query);

        setMovies(results);
        onSearching(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(loadMovies, 500);

    return () => clearTimeout(timer);
  }, [query, onSearching]);

  return (
    <section className="bg-slate-950 px-6 py-10">
      <div className="mx-auto max-w-4xl">

        <input
          type="text"
          placeholder="🔍 Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 text-lg text-white outline-none focus:border-red-500"
        />

        {loading && (
          <p className="mt-6 text-center text-gray-400">
            Searching...
          </p>
        )}

        {!loading && query && movies.length === 0 && (
          <p className="mt-6 text-center text-gray-400">
            No movies found.
          </p>
        )}

        {movies.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}

          </div>
        )}

      </div>
    </section>
  );
}