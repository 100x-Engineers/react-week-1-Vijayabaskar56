// import Tweet from "./Tweet";
import { useTweet } from "../context/index";
import React, { Suspense, use, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTweetService } from "../../services/fecthTweetService";
import { useDataContext } from "../context/useFetchDataContext";
import Tweet from "./Tweet";

const Feed = () => {
  const { tweets, isLoadingtweets, isErrortweets } = useDataContext();
  return (
    <>
      <div className="bg-neutral1000 text-neutral50">
        {isLoadingtweets ? (
          <div>Loading....</div>
        ) : (
          tweets.map((tweet) => (
            <div key={tweet.id}>
              {console.log(tweet)}
              <Tweet
                userId={tweet.userId}
                id={tweet.id}
                postedAt={tweet.postedAt}
                content={tweet.content}
                likeCount={tweet.likeCount}
              />
            </div>
          ))
        )}
        {/* <Tweet tweet={tweet} /> */}

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
