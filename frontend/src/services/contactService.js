//const BASE_URL = "http://127.0.0.1:8000/api/contact";
const BASE_URL = "https://movie-explorer-production-64ac.up.railway.app/api/contact";

export async function sendMessage(formData) {

  const response = await fetch(`${BASE_URL}/`, {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

    },

    body: JSON.stringify(formData),

  });

  const data = await response.json();

  if (!response.ok) {

    throw new Error(JSON.stringify(data));

  }

  return data;

}