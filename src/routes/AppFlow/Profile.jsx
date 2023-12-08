import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Tweet from "./Tweet";
import { useTweet } from "../context";
import ProfileHeader from "./componenets/ProfileHeader";
import { useDataContext } from "../context/useFetchDataContext";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import Loader from "../../components/Loader";

const Profile = () => {
  const { tweets, isLoadingtweets } = useDataContext();

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
      <div className="flex w-fit md:items-center md:justify-center ">
        <div className="bg-black text-neutral50">
          <Suspense fallback={<Loader />}>
            <ProfileHeader />
          </Suspense>
          <main className="border-t-2 botder border-neutral-800">
            {isLoadingtweets ? (
              <Loader />
            ) : (
              tweets.map((tweet) => (
                <div key={tweet.id}>
                  {console.log(tweet)}
                  <Tweet
                    userId={tweet.user.displayName}
                    id={tweet.user.username}
                    postedAt={calculateTimePassed(tweet.createdAt)}
                    content={tweet.content}
                    likeCount={tweet.likeCount}
                  />
                </div>
              ))
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Profile;
