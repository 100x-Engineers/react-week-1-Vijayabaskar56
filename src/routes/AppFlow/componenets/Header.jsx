import Image from "../../../components/Image";
import { Link, useLoaderData, useMatch, useNavigate } from "react-router-dom";
import Logo100X from "../../../assets/100x-frame.svg";
import Profile from "../../../assets/group-default.svg";
import HomeIcon from "../../../assets/home-default.svg";
import plus from "../../../assets/content-add.svg";
import Button from "../../../components/Button";
import { useUser } from "../../context/UserContext";

const Header = () => {
  const isHomeActive = useMatch("/");
  const navigator = useNavigate();
  // const users = useLoaderData();
  const { users } = useUser();

  const { id } = users;
  return (
    <header className="inline-flex flex-col justify-between p-5 border-r-2 border-gray-800">
      <div className="flex items-center justify-center gap-4 w-fit md:flex-col bg-neutral1000">
        <Image src={Logo100X} alt="100x-Logo" size="w-14" />
        <Link to="/" className={isHomeActive ? "bg-transparent/60" : null}>
          <div className="inline-flex items-center justify-start h-12 gap-5 px-5 py-3">
            <Image src={HomeIcon} alt="home-icon" />
            {window.innerWidth > 1264 && (
              <p className="text-stone-50 text-lg font-medium font-['Inter'] hidden md:block w-52">
                Home
              </p>
            )}
          </div>
        </Link>
        <Link
          key={id}
          to={`${id}`}
          className={isHomeActive ? "bg-transparent/60" : null}
        >
          <div className="inline-flex items-center justify-start h-12 gap-5 px-5 py-3 ">
            <Image src={Profile} alt="profile-icon" />
            {window.innerWidth > 1264 && (
              <p className="text-stone-50 text-lg font-medium font-['Inter'] hidden w-52  md:block">
                Profile
              </p>
            )}
          </div>
        </Link>
        <div className="">
          <Button
            onClick={() => navigator("/postTweet")}
            varient={`${window.innerWidth > 1264 ? "bluebtn" : "img"}`}
            customSize={`${
              window.innerWidth > 1264
                ? "w-56 h-12 "
                : "w-16 h-16 bg-twitterBluedefault rounded-full shadow justify-start items-start gap-2.5 inline-flex"
            }`}
          >
            {window.innerWidth > 1264 ? (
              <p>Post</p>
            ) : (
              <Image src={plus} alt="plus-icon" size={"w-8 h-8 m-auto"} />
            )}
          </Button>
        </div>
      </div>
      {/* <ProileHandler /> */}
    </header>
  );
};

export default Header;
