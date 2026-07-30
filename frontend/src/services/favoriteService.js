//const BASE_URL = "http://127.0.0.1:8000/api/movies";
const BASE_URL = "https://movie-explorer-production-64ac.up.railway.app/api/movies";

function getToken() {
  return localStorage.getItem("access");
}

export async function getFavorites() {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/favorites/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed");
  }

  const data = await response.json();

  return data.map((item) => item.movie);
}

export async function addFavorite(movie) {
  const token = getToken();

  const response = await fetch(
    `${BASE_URL}/favorites/add/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        movie_id: movie.id,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(JSON.stringify(error));
  }
}

export async function removeFavorite(movieId) {
  const token = getToken();

  const response = await fetch(
    `${BASE_URL}/favorites/remove/${movieId}/`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed");
  }
}