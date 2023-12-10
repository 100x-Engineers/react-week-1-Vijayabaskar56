import { useContext, createContext } from "react";

export const TweetContext = createContext({
  tweets: null,
  isLoadingtweets: true,
  isErrortweets: "",
  setTweets: () => {},
  setIsLoadingtweets: () => {},
  setIsErrortweets: () => {},
});

export const TweetProvider = TweetContext.Provider;

export function useTweet() {
  return useContext(TweetContext);
}
