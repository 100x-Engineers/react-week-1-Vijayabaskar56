// Component imports
import Tweet from "./Tweet";
import ProfileHeader from "./componenets/ProfileHeader";
import Loader from "../../components/Loader";

// Context imports
import { UserTweetProvider } from "../context/UserTweet";
import { UserProvider } from "../context/UserContext";

import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { appUrl } from "../../utils/urls";

const Profile = () => {
  const [userTweets, setUserTweets] = useState();
  const [isLoadingUserTweets, setIsLoadingUserTweets] = useState(true);
  const [isErrorUserTweets, setIsErrorUserTweets] = useState("");
  const fetchUserTweets = async () => {
    setIsLoadingUserTweets(true);
    try {
      const response = await axios.get(`${appUrl}/userTweets`);
      if (response && response.status >= 200 && response.status < 300) {
        console.log(response.data);
        setUserTweets(response.data);
        setIsLoadingUserTweets(false);
      } else {
        setIsErrorUserTweets(response.body.message);
        // setIsLoadingUserTweets(false);
      }
    } catch (error) {
      console.log(error);
      setIsErrorUserTweets(true);
    }
  };

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

  useEffect(() => {
    fetchUserTweets();
  }, []);

  return (
    <>
      <div className="flex w-fit md:items-center md:justify-center ">
        <div className="bg-black text-neutral50">
          <Suspense fallback={<Loader />}>
            <ProfileHeader />
          </Suspense>
          <UserTweetProvider
            value={{
              userTweets,
              isLoadingUserTweets,
              isErrorUserTweets,
              setUserTweets,
              setIsLoadingUserTweets,
              setIsErrorUserTweets,
            }}
          >
            <main className="border-t-2 botder border-neutral-800">
              {isLoadingUserTweets ? (
                <Loader />
              ) : (
                userTweets.map((tweet) => (
                  <div key={tweet.id}>
                    <Tweet
                      tweetId={tweet.id}
                      proilePicUrl={tweet.user.profilePicUrl}
                      displayName={tweet.user.displayName}
                      userName={tweet.user.username}
                      postedAt={calculateTimePassed(tweet.createdAt)}
                      content={tweet.content}
                      likeCount={tweet.likes.length}
                      retweetCount={tweet.reposts.length}
                    />
                  </div>
                ))
              )}
            </main>
          </UserTweetProvider>
        </div>
      </div>
    </>
  );
};

export default Profile;
