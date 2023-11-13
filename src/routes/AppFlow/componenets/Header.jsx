import React from "react";
import Image from "../../../components/Image";
import { Link, useMatch } from "react-router-dom";
import Logo100X from "../../assets/100x-frame.svg";
import Profile from "../../assets/group-default.svg";
import HomeIcon from "../../assets/home-default.svg";

const Header = () => {
  const isHomeActive = useMatch("/");

  return (
    <header className="inline-flex flex-col justify-between p-5 border-r-2 border-gray-800">
      <div className="flex items-center justify-center gap-4 w-fit md:flex-col bg-neutral1000">
        <Image src={Logo100X} alt="100x-Logo" size="w-14" />
        <Link
          to="/profile"
          className={isHomeActive ? "bg-transparent/60" : null}
        >
          <div className="inline-flex items-center justify-start h-12 gap-5 px-5 py-3">
            <Image src={HomeIcon} alt="home-icon" />
            {windowWidth > 1264 && (
              <p className="text-stone-50 text-lg font-medium font-['Inter'] hidden md:block w-52">
                Home
              </p>
            )}
          </div>
        </Link>
        <Link
          to="/profile"
          className={isHomeActive ? "bg-transparent/60" : null}
        >
          <div className="inline-flex items-center justify-start h-12 gap-5 px-5 py-3 ">
            <Image src={Profile} alt="profile-icon" />
            {windowWidth > 1264 && (
              <p className="text-stone-50 text-lg font-medium font-['Inter'] hidden w-52  md:block">
                Profile
              </p>
            )}
          </div>
        </Link>
        <div className="p-3">
          <Button
            varient={`${windowWidth > 1264 ? "bluebtn" : "img"}`}
            customSize={`${
              windowWidth > 1264
                ? "w-56 h-12 "
                : "w-16 h-16 p-4 bg-twitterBluedefault rounded-full shadow justify-start items-start gap-2.5 inline-flex"
            }`}
          >
            {windowWidth > 1264 ? (
              <p>Post</p>
            ) : (
              <Image src={plus} alt="plus-icon" size={"w-8 h-8 relative z-"} />
            )}
          </Button>
        </div>
      </div>
      {/* <ProileHandler /> */}
    </header>
  );
};

export default Header;
