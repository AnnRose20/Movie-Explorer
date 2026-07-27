const BASE_URL = "http://127.0.0.1:8000/api";

// Register
export async function registerUser(userData) {

  const response = await fetch(`${BASE_URL}/register/`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}


// Login
export async function loginUser(credentials) {

  const response = await fetch(`${BASE_URL}/login/`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Invalid username or password");
  }

  return data;
}


export function logout() {

  localStorage.removeItem("access");

  localStorage.removeItem("refresh");

  window.location.href = "/login";

}