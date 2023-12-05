import { useContext, createContext } from "react";

export const TweetContext = createContext({
  tweet: null,
  postTweet: (tweet) => {},
  updateTweet: (id, tweet) => {},
  deleteTweet: (id, tweet) => {},
});

export const TweetProvider = TweetContext.Provider;

export function useTweet() {
  return useContext(TweetContext);
}
