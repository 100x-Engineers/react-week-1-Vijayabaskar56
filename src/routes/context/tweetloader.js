import axios from "axios";
import { appUrl } from "../../utils/urls";

export const loader = async () => {
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
