import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Tweet from "./Tweet";
import { useTweet } from "../context";

const Profile = () => {
  const { tweets } = useTweet();
  // const [tweet, setTweet] = useState(tweets);
  return (
    <>
      <div className="flex md:items-center md:justify-center md:w-screen">
        <div className="bg-black md:w-3/5 text-neutral50">
          <header>
            <section className="inline-flex flex-col items-end justify-center gap-2 ">
              <img
                src="../../public/images/image-17.png"
                alt="banner"
                className="flex-shrink-0 w-screen h-h02"
              />
              <img
                src="../../public/images/user-avatar.svg"
                alt="profileIcon"
                className="absolute w-12 h-12 border-2 border-solid rounded-full top-32 left-5 border-neutral1000"
              />
              <Link to="/editprofile">
                <Button varient="outlineBlack" buttonsize="sm">
                  Edit Profile
                </Button>
              </Link>
            </section>
            <section className="flex-col items-start gap-4 px-5 pt-0 pb-3 flex-end border-b-neutral-400">
              <div>
                <h1 className="text-xl font-bold text-neutral50">
                  Vijayabaskar
                </h1>
                <p className="text-base font-normal text-neutral500 font-inter">
                  @VJBass
                </p>
              </div>
              <p className="text-base font-normal w-96 text-stone-50 font-inter">
                Digital Goodies Team - Web &amp; Mobile UI/UX development;
                Graphics; Illustrations
              </p>
              <div className="inline-flex items-start justify-start h-5 gap-5 w-80">
                <div className="flex items-center justify-start gap-1">
                  <img
                    src="../../public/images/link-icon.svg"
                    alt="link-icon"
                  />
                  <a href="#" className="text-base text-sky-500">
                    pixsellz.io
                  </a>
                </div>
                <div className="flex items-center justify-start gap-1">
                  <img
                    src="../../public/images/calendar-sv.svg"
                    alt="link-icon"
                  />
                  <p className="text-base font-normal text-neutral-500 font-inter">
                    Joined September 2018
                  </p>
                </div>
              </div>
              <div className="inline-flex items-end justify-start w-56 h-5 gap-5">
                <div>
                  <span className="text-neutral50">217</span>
                  <span> </span>
                  <span className="text-base font-normal text-neutral-500 font-inter">
                    Following
                  </span>
                </div>
                <div>
                  <span className="text-neutral50">118</span>
                  <span> </span>
                  <span className="text-base font-normal text-neutral-500 font-inter">
                    Followers
                  </span>
                </div>
              </div>
            </section>
          </header>
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
