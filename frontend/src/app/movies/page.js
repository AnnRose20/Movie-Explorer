"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { getMoviesByPage } from "@/services/movieService";
import Link from "next/link";

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function loadMovies() {
            try {
                const data = await getMoviesByPage("movies", page);

                setMovies(data.results);
                setTotalPages(data.total_pages);
            } catch (error) {
                console.error(error);
            }
        }

        loadMovies();
    }, [page]);

    return (
        <main className="min-h-screen bg-slate-950 px-6 py-12">
            <div className="mx-auto max-w-7xl">

                <Link
                    href="/"
                    className="mb-8 mt-10 inline-flex items-center gap-2 rounded-full bg-slate-800 px-5 py-3 text-white transition hover:bg-red-600"
                >
                    ← Back
                </Link>

                <h1 className="mb-10 mt-10 text-4xl font-bold text-white">
                    🔥 Popular Movies
                </h1>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>

                <div className="mt-12 flex items-center justify-center gap-4">

                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="rounded bg-red-600 px-5 py-2 text-white disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="text-lg text-white">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        className="rounded bg-red-600 px-5 py-2 text-white disabled:opacity-50"
                    >
                        Next
                    </button>

                </div>

            </div>
        </main>
    );
}