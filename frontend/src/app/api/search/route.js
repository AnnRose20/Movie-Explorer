export async function GET(request) {
  const API_KEY = process.env.TMDB_API_KEY;

  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");

  if (!query) {
    return Response.json({ results: [] });
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
    {
      cache: "no-store",
    }
  );

  const data = await response.json();

  return Response.json(data);
}