import PropTypes from "prop-types";
import axios from "axios";
import { appUrl } from "../../../utils/urls";
import { useRef, useState } from "react";
import { useUser } from "../../context/UserContext";

function ReactIcons({ activImg, inactiveImg, name, value, tweetId }) {
  const [isActive, setISActive] = useState(false);
  const { users } = useUser();
  const likeCountRef = useRef(!value ? 0 : value);
  const clickhandler = async (e) => {
    if (e.target.name === "like") {
      const response = await axios.post(`${appUrl}/posts/${tweetId}/like`, {
        likedBy: users.id,
      });
      if (response.status >= 200 && response.status < 300) {
        isActive
          ? (likeCountRef.current = likeCountRef.current - 1)
          : (likeCountRef.current = likeCountRef.current + 1);
        console.log(response);
        setISActive(!isActive);
      }
    } else if (e.target.name === "retweet") {
      isActive
        ? (likeCountRef.current = likeCountRef.current - 1)
        : (likeCountRef.current = likeCountRef.current + 1);
      const response = await axios.post(`${appUrl}/posts/${tweetId}/reposts`, {
        userId: users.id,
        type: isActive,
      });
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        setISActive(!isActive);
      }
    } else if (e.target.name === "comment" || e.target.name === "reach") {
      console.log("comment");
    }
  };
  return (
    <>
      <div className="flex">
        <img
          name={name}
          src={isActive ? inactiveImg : activImg}
          alt="icon"
          onClick={(e) => clickhandler(e)}
        />
        <p className="px-1 text-neutral500">{likeCountRef.current}</p>
      </div>
    </>
  );
}

export default ReactIcons;

ReactIcons.propTypes = {
  activImg: PropTypes.string,
  inactiveImg: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  tweetId: PropTypes.string,
};
