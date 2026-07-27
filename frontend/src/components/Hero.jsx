"use client";

import { useEffect, useState } from "react";
import { getMovies } from "@/services/movieService";

export default function Hero() {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function loadMovie() {
            try {
                const movies = await getMovies("movies");

                setMovie(movies[0]);
            } catch (error) {
                console.error(error);
            }
        }

        loadMovie();
    }, []);

    if (!movie) {
        return (
            <section className="flex min-h-screen items-center justify-center">
                <h1 className="text-3xl">Loading...</h1>
            </section>
        );
    }

    return (
        <section
            className="relative flex min-h-screen items-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${movie.backdrop})`,
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-bold text-white md:text-7xl">
                        {movie.title}
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        {movie.overview}
                    </p>

                    <div className="mt-6 flex gap-8 text-lg text-yellow-400">
                        <span>⭐ {movie.rating.toFixed(1)}</span>

                        <span>📅 {movie.release_date}</span>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <button className="rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700">
                            Watch Now
                        </button>

                        <button className="rounded-lg border border-white px-6 py-3 font-semibold hover:bg-white hover:text-black">
                            More Info
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}