import { Suspense, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { TweetProvider } from "../context";
import axios from "axios";
import { appUrl } from "../../utils/urls";

const Nav = () => {
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();
  const [tweets, setTweets] = useState();
  const [isLoadingtweets, setIsLoadingtweets] = useState(true);
  const [isErrortweets, setIsErrortweets] = useState("");

  const base =
    "pb-3 text-base font-medium text-center whitespace-nowrap font-px-secondary";
  const seleted = "text-neutral-500 border-twitterBlue border-b-2";

  const fetchTweets = async () => {
    setIsLoadingtweets(true);
    try {
      const response = await axios.get(`${appUrl}/feed`);
      if (response && response.status >= 200 && response.status < 300) {
        console.log("from nav bar with tweet context", response.data);
        setTweets(response.data);
        setIsLoadingtweets(false);
      } else {
        setIsErrortweets(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <>
      <div className="h-screen">
        <div className="bg-neutral1000 text-neutral50 ">
          <nav className="">
            <div className="inline-flex items-center justify-around w-full pt-5 border-b h-fit border-neutral700">
              <button
                className={`${base} ${isActive ? seleted : null}`}
                onClick={() => {
                  setIsActive(!isActive);
                  navigate("");
                }}
              >
                For You
              </button>
              <button
                className={`${base} ${!isActive ? seleted : null}`}
                onClick={() => {
                  setIsActive(!isActive);
                  navigate("following");
                }}
              >
                Following
              </button>
            </div>
          </nav>
        </div>
        <Suspense fallback={<Loader />}>
          <TweetProvider
            value={{
              tweets,
              isLoadingtweets,
              isErrortweets,
              setTweets,
              setIsLoadingtweets,
              setIsErrortweets,
              fetchTweets,
            }}
          >
            <Outlet />
          </TweetProvider>
        </Suspense>
      </div>
    </>
  );
};

export default Nav;
