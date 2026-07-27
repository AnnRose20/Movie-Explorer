const BASE_URL = "http://127.0.0.1:8000/api";

export async function getProfile() {

  const token = localStorage.getItem("access");

  if (!token) {
    return null;
  }

  const response = await fetch(
    `${BASE_URL}/profile/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return await response.json();
}