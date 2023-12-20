// import Tweet from "./Tweet";
import { useTweet } from "../context/index";
import { Link, useLoaderData } from "react-router-dom";
import Tweet from "./Tweet";

const Feed = () => {
  // const { tweets, isLoadingtweets } = useTweet();
  const tweet = useLoaderData();
  console.log(tweet);
  const calculateTimePassed = (dateString) => {
    const currentDate = new Date();
    const givenDate = new Date(dateString);

    const diffInMilliseconds = currentDate - givenDate;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    return Math.floor(diffInHours) > 24
      ? Math.floor(diffInDays) + " d"
      : Math.floor(diffInHours) + " h";
  };

  return (
    <>
      <div className="bg-neutral1000 text-neutral50">
        {tweet.map((tweet) => (
          <div key={tweet.id}>
            <Tweet
              userId={tweet.userId}
              tweetId={tweet.id}
              displayName={tweet.user.displayName}
              userName={tweet.user.username}
              postedAt={calculateTimePassed(tweet.createdAt)}
              content={tweet.content}
              likeCount={tweet.likes.length}
              retweetCount={tweet.reposts.length}
              proilePicUrl={tweet.user.profilePicUrl}
            />
          </div>
        ))}

        <div className="fixed hidden px-8 py-3 text-center transform -translate-x-1/2 rounded-full left-1/2 bottom-14 w-52 bg-searchbarFill whitespace-nowrap">
          Copied to clipboard.
        </div>
        <Link to="/postTweet">
          <button className="fixed right-8 transform -translate-x md:hidden bottom-14 w-16 h-16 p-4 bg-twitterBluedefault rounded-full shadow justify-start items-start gap-2.5 inline-flex">
            <img src="../../public/images/content-add.svg" alt="plus-icon" />
          </button>
        </Link>
      </div>
    </>
  );
};

export default Feed;
