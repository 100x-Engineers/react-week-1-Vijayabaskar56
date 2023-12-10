import axios from "axios";

const URL = "http://localhost:3000/";

export const AuthService = async (email, password) => {
  try {
    const response = await axios.post(`${URL}login`, {
      email,
      password,
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const Registration = async (userInfo) => {
  await axios.post(`${URL}/registration`, {
    userInfo,
  });
};

export const VerificationCode = async (code) => {
  await axios.post(`${URL}/verificationCode`, {
    code,
  });
};

export const password = async (password) => {
  await axios.post(`${URL}/password`, {
    password,
  });
};

export const postTweet = async (tweet) => {
  await axios.post(`${URL}/posts`, {
    tweet,
  });
};
