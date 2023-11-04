import { useContext, createContext } from "react";

export const TweetContext = createContext({
  tweet: [
    {
      id: 0,
      userId: "",
      tweetText: "",
      time: "",
      comments: 0,
      retweet: 0,
      likes: 0,
    },
  ],
  postTweet: (tweet) => {},
  updateTweet: (id, tweet) => {},
  deleteTweet: (id, tweet) => {},
});

export const TweetProvider = TweetContext.Provider;

export function useTweet() {
  return useContext(TweetContext);
}
