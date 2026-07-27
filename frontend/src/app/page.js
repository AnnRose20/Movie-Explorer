import Hero from "@/components/Hero";
import MovieSection from "@/components/MovieSection";
import SearchSection from "@/components/SearchSection";

export default function Home() {
  return (
    <main className="pt-20">
      <Hero />

      <SearchSection/>

      <MovieSection
        title="🔥 Popular Movies"
        endpoint="movies"
      />

      <MovieSection
        title="⭐ Top Rated"
        endpoint="top-rated"
      />

      <MovieSection
        title="🎬 Upcoming"
        endpoint="upcoming"
      />
    </main>

  );
}