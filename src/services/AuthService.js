const URL = import.meta.env.VITE_APP_API_URL;
console.log(URL);

export const AuthService = async (email, password) => {
  try {
    const response = await fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log(error);
    return error;
  }
};
