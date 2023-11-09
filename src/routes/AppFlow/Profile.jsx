import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Tweet from "./Tweet";
import { useTweet } from "../context";
import ProfileHeader from "./componenets/ProfileHeader";

const Profile = () => {
  const { tweets } = useTweet();
  // const [tweet, setTweet] = useState(tweets);
  return (
    <>
      <div className="flex md:items-center md:justify-center md:w-screen">
        <div className="bg-black md:w-3/5 text-neutral50">
          <ProfileHeader />
          <main>
            {tweets.map((tweets) => (
              <div key={tweets.id}>
                {console.log(tweets)}
                <Tweet tweet={tweets} />
              </div>
            ))}
          </main>
          <button className="fixed right-5 transform -translate-x bottom-14 w-16 h-16 p-4 bg-twitterBluedefault rounded-full shadow justify-start items-start gap-2.5 inline-flex">
            <Link to="/postTweet">
              <img src="../../public/images/content-add.svg" alt="plus-icon" />
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
