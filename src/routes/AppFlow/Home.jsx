import Tweet from "./Tweet";
import { useTweet } from "../context/index";
import { useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const { tweets } = useTweet();
  const [tweet, setTweet] = useState(tweets);
  console.log([tweets], tweet);
  // setTweet(tweet);
  return (
    <>
      <div className="bg-neutral1000 text-neutral50">
        {tweet.map((tweets) => (
          <div key={tweets.id}>
            {console.log(tweets)}
            <Tweet tweet={tweets} />
          </div>
        ))}
        {/* <Tweet tweet={tweet} /> */}
        <div className="flex flex-col self-stretch bg-orange600">
          NOting yet to see
        </div>
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

export default Home;
