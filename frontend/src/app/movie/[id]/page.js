import {
  getMovie,
  getRecommendedMovies,
  getTrailer,
} from "@/services/movieService";
import Link from "next/link";
import MovieCard from "@/components/MovieCard";

export default async function MoviePage({ params }) {
  const { id } = await params;

  const [movie, recommendations, trailer] = await Promise.all([
    getMovie(id),
    getRecommendedMovies(id),
    getTrailer(id),
  ]);
  // Format Release Date
  const releaseDate = new Date(movie.release_date).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  // Format Runtime
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;

  // Format Currency
  const formatCurrency = (amount) => {
    if (!amount) return "Not Available";

    return `$${amount.toLocaleString()}`;
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">


      {/* Backdrop */}
      <div
        className="relative h-[350px] md:h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <Link
          href="/"
          className="absolute left-6 top-24 z-50 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-white"
        >
          ← Back
        </Link>



      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto -mt-36 max-w-6xl px-6 pb-20">
        <div className="flex flex-col gap-10 md:flex-row">

          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="mx-auto w-60 rounded-xl shadow-2xl md:mx-0 md:w-72 lg:w-100"
          />

          {/* Movie Details */}
          <div className="flex-1">

            {/* Title */}
            <h1 className="text-center text-3xl font-bold md:text-left md:text-5xl">
              {movie.title}
            </h1>

            {/* Rating, Date, Runtime */}
            <div className="mt-5 flex flex-wrap gap-6 text-lg text-gray-300">

              <span>
                ⭐ {movie.vote_average.toFixed(1)}
              </span>

              <span>
                📅 {releaseDate}
              </span>

              <span>
                ⏱️ {hours}h {minutes}m
              </span>

            </div>

            {/* Genres */}
            <div className="mt-20 flex flex-wrap gap-3">

              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-red-600 px-4 py-2 text-sm"
                >
                  {genre.name}
                </span>
              ))}

            </div>

            {/* Overview */}
            <div className="mt-10">

              <h2 className="mb-4 text-2xl font-semibold">
                Overview
              </h2>

              <p className="text-justify leading-8 text-gray-300">
                {movie.overview}
              </p>

            </div>

            {/* Extra Information */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2">

              <div className="rounded-lg bg-slate-900 p-5">

                <h3 className="text-gray-400">
                  Original Language
                </h3>

                <p className="mt-2 text-xl font-semibold">
                  {movie.original_language.toUpperCase()}
                </p>

              </div>

              <div className="rounded-lg bg-slate-900 p-5">

                <h3 className="text-gray-400">
                  Budget
                </h3>

                <p className="mt-2 text-xl font-semibold">
                  {formatCurrency(movie.budget)}
                </p>

              </div>

              <div className="rounded-lg bg-slate-900 p-5">

                <h3 className="text-gray-400">
                  Revenue
                </h3>

                <p className="mt-2 text-xl font-semibold">
                  {formatCurrency(movie.revenue)}
                </p>

              </div>

              <div className="rounded-lg bg-slate-900 p-5">

                <h3 className="text-gray-400">
                  Status
                </h3>

                <p className="mt-2 text-xl font-semibold">
                  {movie.status}
                </p>

              </div>

            </div>

            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-semibold">
                Production Companies
              </h2>

              <div className="flex flex-wrap gap-6">
                {movie.production_companies.map((company) => (
                  <div
                    key={company.id}
                    className="flex h-28 w-64 items-center justify-center rounded-xl bg-white p-4 shadow-lg"
                  >
                    {company.logo_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${company.logo_path}`}
                        alt={company.name}
                        className="max-h-20 object-contain"
                      />
                    ) : (
                      <p className="text-center text-black font-semibold">
                        {company.name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {movie.homepage && (
              <div className="mt-12">

                <h2 className="mb-4 text-2xl font-semibold">
                  Official Website
                </h2>

                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
                >
                  Visit Official Website
                </a>

              </div>
            )}

          </div>

        </div>

      </div>


      {/* Trailer Section */}
      {trailer && (
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-10">

          <h2 className="mb-12 text-2xl md:text-3xl font-bold">
            🎬 Official Trailer
          </h2>

          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">

            <div className="aspect-video">

              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1`}
                title={trailer.name}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

            </div>

          </div>

        </section>
      )}

      
      {/* Recommended Movies */}

      <section className="mx-auto max-w-7xl px-6 pb-20">

        <h2 className="mb-12 text-2xl md:text-3xl font-bold">
          ⭐ Recommended Movies
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">

          {recommendations.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}

        </div>

      </section>

    </main>
  );
}