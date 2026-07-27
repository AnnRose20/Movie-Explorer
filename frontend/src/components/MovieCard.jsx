import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";

export default function MovieCard({ movie }) {
  const poster =
    movie.poster ||
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const rating =
    movie.rating ?? movie.vote_average;

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="relative overflow-hidden rounded-xl bg-slate-800 shadow-lg transition-transform duration-300 hover:scale-105">

        <FavoriteButton movie={movie} />

        <Image
          src={poster}
          alt={movie.title}
          width={500}
          height={750}
          className="h-80 w-full object-cover"
        />

        <div className="p-4">
          <h2 className="truncate text-lg font-bold text-white">
            {movie.title}
          </h2>

          <p className="mt-2 text-yellow-400">
            ⭐ {rating?.toFixed(1)}
          </p>

          <p className="mt-2 text-sm text-gray-400">
            {movie.release_date}
          </p>
        </div>

      </div>
    </Link>
  );
}