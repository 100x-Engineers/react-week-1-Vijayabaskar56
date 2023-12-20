import axios from "axios";
export const loader = async ({ params }) => {
  const appUrl = import.meta.env.VITE_APP_API_URL;
  const response = await axios.get(
    `${appUrl}/userTweets/${params ? params.id : null}`
  );
  if (response && response.status >= 200 && response.status < 300) {
    const user = response.data;
    console.log(response);
    return user;
  } else {
    const { message } = response;
    return message;
  }
};
