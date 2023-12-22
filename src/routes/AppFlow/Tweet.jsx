import CommentIcon from "../../assets/comment-sv.svg";
import RetweetIcon from "../../assets/retweet-sv.svg";
import heartICon from "../../assets/heart-sv.svg";
import reachIcon from "../../assets/reach-sv.svg";
import shareIcon from "../../assets/share-sv.svg";
import heartActiveIcon from "../../assets/heart-sv-active.svg";
import retweetActiveIcon from "../../assets/retweet-sv-active.svg";
import shareActiveIcon from "../../assets/share-sv-active.svg";
// Component imports
import ReactIcons from "./componenets/ReactIcons";
import TweetHeader from "./componenets/TweetHeader";
import Avatar from "./componenets/Avatar";

// Other imports
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import { useGetUsers } from "../context/useGetUser";

const Tweet = ({
  displayName,
  userName,
  postedAt,
  content,
  likeCount,
  retweetCount,
  tweetId,
  proilePicUrl,
  userId,
}) => {
  const [isActive, setISActive] = useState(false);
  // const { users, isErrorUser } = useGetUsers();
  const copyToClipboard = async () => {
    const location = window.location.href;
    try {
      await navigator.clipboard.writeText(location);
      setISActive(true);
      setTimeout(() => {
        setISActive(false);
      }, 5000);
      console.log("copied");
    } catch (err) {
      console.log("not copied", err);
    }
  };

  const CopyToClipboardMessage = () => {
    return (
      <div className="fixed z-10 px-8 py-3 text-center transform -translate-x-1/2 rounded-full left-1/2 bottom-14 w-52 bg-searchbarFill whitespace-nowrap">
        Copied to clipboard.
      </div>
    );
  };

  return (
    <>
      <main>
        <section className="inline-flex items-start justify-start w-full h-full gap-4 px-4 py-2 border-b border-r border-neutral700">
          <Link key={userId} to={userId}>
            <Avatar Avatar={proilePicUrl} />
          </Link>
          <div className="inline-flex flex-col items-start justify-start gap-1 w-fit grow shrink basis-0">
            <TweetHeader
              // tweetId={tweetId}
              userId={userId}
              name={displayName}
              userName={userName}
              time={postedAt}
              tweet={content}
            />
            <div className="inline-flex items-center self-stretch justify-between w-full">
              <ReactIcons
                name="comment"
                tweetId={tweetId}
                activImg={CommentIcon}
                inactiveImg={CommentIcon}
                value="11"
              />
              <ReactIcons
                name="retweet"
                tweetId={tweetId}
                activImg={RetweetIcon}
                inactiveImg={retweetActiveIcon}
                value={retweetCount}
                // onClick={() => setRetweet(!retweet)}
              />
              <ReactIcons
                name="like"
                tweetId={tweetId}
                activImg={heartICon}
                inactiveImg={heartActiveIcon}
                value={likeCount}
              />

              <div className="flex">
                <img name="reach" src={reachIcon} alt="reach-icon" />
              </div>
              <div className="flex">
                <img
                  name="share"
                  src={isActive ? shareActiveIcon : shareIcon}
                  alt="shareicon"
                  onClick={() => copyToClipboard()}
                />
              </div>
            </div>
            {isActive && <CopyToClipboardMessage />}
          </div>
        </section>
      </main>
    </>
  );
};

export default Tweet;

// props types
Tweet.propTypes = {
  displayName: PropTypes.string,
  userName: PropTypes.string,
  postedAt: PropTypes.string,
  content: PropTypes.string,
  likeCount: PropTypes.number,
  tweetId: PropTypes.number,
  retweetCount: PropTypes.number,
  proilePicUrl: PropTypes.string,
  userId: PropTypes.number,
};
