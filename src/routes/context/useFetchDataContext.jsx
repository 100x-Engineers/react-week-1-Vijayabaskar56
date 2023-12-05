/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import axios from "axios";

import { appUrl } from "../../utils/urls";

export const DataContext = createContext({});

export const DataContextProvider = ({ children }) => {
  const [users, setUser] = useState();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isErrorUser, setIsErrorUser] = useState("");

  const [tweets, setTweets] = useState();
  const [isLoadingtweets, setIsLoadingtweets] = useState(true);
  const [isErrortweets, setIsErrortweets] = useState("");

  const [userTweets, setUserTweets] = useState();
  const [isLoadingUserTweets, setIsLoadingUserTweets] = useState(true);
  const [isErrorUserTweets, setIsErrorUserTweets] = useState("");

  const { token } = useAuth();

  const fetchUser = async () => {
    setIsLoadingUser(true);
    try {
      const response = await axios.get(`${appUrl}/users`);
      if (response && response.status >= 200 && response.status < 300) {
        const { user } = response.data;
        setUser(user);
        setIsLoadingUser(false);
      } else {
        setIsErrorUser(response.message);
        setIsLoadingUser(false);
      }
    } catch (error) {
      console.log(error);
      setIsErrorUser("Error Fecting User Data");
      setIsLoadingUser(false);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const fetchTweets = async () => {
    setIsLoadingtweets(true);
    try {
      const response = await axios.get(`${appUrl}/feed`);
      if (response && response.status >= 200 && response.status < 300) {
        console.log(response.data);
        setTweets(response.data);
        setIsLoadingtweets(false);
      } else {
        setIsErrortweets(response);
        setIsLoadingtweets(false);
      }
    } catch (error) {
      console.log(error);
      setIsErrortweets(true);
    } finally {
      setIsLoadingtweets(false);
    }
  };

  const fetchUserTweets = async () => {
    setIsLoadingUserTweets(true);
    try {
      const response = await axios.get(`${appUrl}/tweets/${users.id}}`);
      if (response && response.status >= 200 && response.status < 300) {
        console.log(response.data);
        setUserTweets(response.data);
        setIsLoadingUserTweets(false);
      } else {
        setIsErrorUserTweets(response.body.message);
        setIsLoadingUserTweets(false);
      }
    } catch (error) {
      console.log(error);
      setIsErrorUserTweets(true);
    } finally {
      setIsLoadingUserTweets(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
      fetchTweets();
      // fetchUserTweets();
    }
  }, [token]);

  return (
    <DataContext.Provider
      value={{
        users,
        isLoadingUser,
        isErrorUser,
        tweets,
        isLoadingtweets,
        isErrortweets,
        userTweets,
        isLoadingUserTweets,
        isErrorUserTweets,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
