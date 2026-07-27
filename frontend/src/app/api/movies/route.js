export async function GET(request) {
  try {
    const API_KEY = process.env.TMDB_API_KEY;

    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || 1;

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
    );

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch movies" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}