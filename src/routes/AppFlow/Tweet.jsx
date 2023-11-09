import CommentIcon from "../../assets/comment-sv.svg";
import RetweetIcon from "../../assets/retweet-sv.svg";
import heartICon from "../../assets/heart-sv.svg";
import reachIcon from "../../assets/reach-sv.svg";
import shareIcon from "../../assets/share-sv.svg";
import heartActiveIcon from "../../assets/heart-sv-active.svg";
import retweetActiveIcon from "../../assets/retweet-sv-active.svg";
import shareActiveIcon from "../../assets/share-sv-active.svg";
import userAvatar from "../../assets/user-avatar.svg";
import ReactIcons from "./componenets/ReactIcons";
import { useState } from "react";
import TweetHeader from "./componenets/TweetHeader";
import Avatar from "./componenets/Avatar";

const Tweet = ({ ...tweets }) => {
  console.log(tweets);
  return (
    <>
      <main>
        <section className="inline-flex items-start justify-start w-full h-full gap-4 px-4 py-2 border-b border-neutral700">
          <Avatar Avatar={userAvatar} />
          <div className="inline-flex flex-col items-start justify-start gap-1 grow shrink basis-0">
            <TweetHeader
              name={tweets.tweet.userId}
              userId={tweets.tweet.id}
              time={tweets.tweet.time}
              tweet={tweets.tweet.tweetText}
            />
            <div className="inline-flex items-center self-stretch justify-between">
              <ReactIcons
                activImg={CommentIcon}
                inactiveImg={CommentIcon}
                value="11"
              />
              <ReactIcons
                activImg={RetweetIcon}
                inactiveImg={retweetActiveIcon}
                value="11"
                // onClick={() => setRetweet(!retweet)}
              />
              <ReactIcons
                activImg={heartICon}
                inactiveImg={heartActiveIcon}
                value="11"
              />
              <ReactIcons
                activImg={reachIcon}
                inactiveImg={reachIcon}
                alt="reach-icon"
                value="11"
              />
              <ReactIcons activImg={shareIcon} inactiveImg={shareActiveIcon} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Tweet;
