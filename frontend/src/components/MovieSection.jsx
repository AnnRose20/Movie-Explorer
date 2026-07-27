"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getMovies } from "@/services/movieService";

export default function MovieSection({ title, endpoint }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function loadMovies() {
            try {
                const movies = await getMovies(endpoint);
                setMovies(movies);
            } catch (error) {
                console.error(error);
            }
        }

        loadMovies();
    }, [endpoint]);

    return (
        <section className="bg-slate-950 px-6 py-16">
            <div className="mx-auto max-w-7xl">

                <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-white">
                        {title}
                    </h2>

                    {endpoint === "movies" && (
                        <Link
                            href="/movies"
                            className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
                        >
                            View All →
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}