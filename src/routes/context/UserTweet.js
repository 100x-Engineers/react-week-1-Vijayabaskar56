import { useContext, createContext } from "react";

export const userTweet = createContext({
  userTweets: null,
  isLoadingUserTweets: true,
  isErrorUserTweets: "",
  setUserTweets: () => {},
  setIsLoadingUserTweets: () => {},
  setIsErrorUserTweets: () => {},
});

export const UserTweetProvider = userTweet.Provider;

export function useUserTweet() {
  return useContext(userTweet);
}
