import axios from "axios";

const URL = import.meta.VITE_APP_API_URL;

export const AuthService = async (email, password) => {
  try {
    const response = await axios.post(`${URL}/login`, {
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
  return await axios.post(`${URL}/registration`, {
    userInfo,
  });
};

export const VerificationCode = async (code) => {
  return await axios.post(`${URL}/verificationCode`, {
    code,
  });
};

export const password = async (password) => {
  return await axios.post(`${URL}/password`, {
    password,
  });
};

export const postTweet = async (tweet) => {
  return await axios.post(`${URL}/posts`, {
    tweet,
  });
};

export const followUser = async (userId, followedId) => {
  return await axios.post(`${URL}/followAction`, {
    userId,
    followedId,
  });
};
