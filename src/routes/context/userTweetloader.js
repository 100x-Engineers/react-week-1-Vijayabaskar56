import axios from "axios";
import { appUrl } from "../../utils/urls";
export const loader = async ({ params }) => {
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
