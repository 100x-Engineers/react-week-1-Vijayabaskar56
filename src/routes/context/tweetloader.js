import axios from "axios";

export const loader = async () => {
  const appUrl = import.meta.env.VITE_APP_API_URL;
  console.log(appUrl, "from tweetloader");
  const response = await axios.get(`${appUrl}/feed`);
  if (response && response.status >= 200 && response.status < 300) {
    const posts = response.data;
    console.log(posts);
    return posts;
  } else {
    const { message } = response;
    return message;
  }
};
