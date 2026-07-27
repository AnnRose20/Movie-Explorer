"use client";

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getPopularMovies } from "@/services/movieService";

export default function MovieGrid() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function loadMovies() {
            try {
                const movies = await getPopularMovies();

                setMovies(movies);
            } catch (error) {
                console.error(error);
            }
        }

        loadMovies();
    }, []);

    return (
        <section className="bg-slate-950 px-6 py-16">
            <div className="mx-auto max-w-7xl">
                <h2 className="mb-10 text-3xl font-bold text-white">
                    Popular Movies
                </h2>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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