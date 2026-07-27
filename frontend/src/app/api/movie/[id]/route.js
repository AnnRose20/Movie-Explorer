export async function GET(request, { params }) {
  const API_KEY = process.env.TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}`
  );

  const data = await response.json();

  return Response.json(data);
}