import React from "react";
import TweetHeader from "./TweetHeader";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const ReplayTweet = ({
  userId,
  displayName,
  userName,
  postedAt,
  content,
  proilePicUrl,
}) => {
  return (
    <>
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
        </div>
        <TweetHeader
          userId={userId}
          name={displayName}
          userName={userName}
          time={postedAt}
          tweet={content}
        />
      </section>
    </>
  );
};

export default ReplayTweet;
