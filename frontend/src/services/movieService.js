//const BASE_URL = "http://127.0.0.1:8000/api/movies";
const BASE_URL = "https://movie-explorer-production-64ac.up.railway.app/api/movies";

// Popular / Top Rated / Upcoming
export async function getMovies(endpoint) {

  let url = BASE_URL;

  if (endpoint !== "movies") {
    url += `/${endpoint}`;
  }

  const response = await fetch(`${url}/`);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  // Popular movies endpoint is paginated
  if (endpoint === "movies") {
    return data.results;
  }

  // Top Rated & Upcoming already return an array
  return data;
}

// Popular Movies Pagination
export async function getMoviesByPage(endpoint, page = 1) {

  let url = BASE_URL;

  if (endpoint !== "movies") {
    url += `/${endpoint}`;
  }

  const response = await fetch(
    `${url}/?page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return await response.json();
}

// Single Movie
export async function getMovie(id) {

  const response = await fetch(
    `${BASE_URL}/${id}/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }

  return await response.json();
}

// Search (still using TMDB API route for now)
export async function searchMovies(query) {

  const response = await fetch(
     `${BASE_URL}/search/?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  return await response.json();

}

// Recommendations (still using TMDB)
export async function getRecommendedMovies(id) {

  const response = await fetch(
    `${BASE_URL}/${id}/recommendations/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return await response.json();
}


export async function getTrailer(id) {

  const response = await fetch(
    `${BASE_URL}/${id}/trailer/`
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
}