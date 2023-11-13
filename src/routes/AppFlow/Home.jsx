import React, { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import Image from "../../components/Image";
import Logo100X from "../../assets/100x-frame.svg";
import Nav from "./Nav";
import Profile from "../../assets/group-default.svg";
import HomeIcon from "../../assets/home-default.svg";
import Button from "../../components/Button";
import Search from "./componenets/Search";
import Trending from "./componenets/Trending";

const Home = () => {
  const isHomeActive = useMatch("/");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ProileHandler = () => {
    return (
      <>
        <div className="inline-flex items-center justify-between h-10 w-60">
          <div className="flex items-start justify-start gap-3">
            <img
              className="relative w-10 h-10 rounded-full"
              src="https://via.placeholder.com/39x39"
            />
            <div className="inline-flex flex-col items-start justify-start">
              <div className="text-stone-50 text-base font-bold font-['Inter']">
                aarushe_reddy
              </div>
              <div className="text-neutral-500 text-base font-normal font-['Inter']">
                @aarushe_reddy
              </div>
            </div>
          </div>
          <div className="relative w-8 h-8" />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex-col-reverse">
        {/* <header className="flex justify-start px-4 py-3 border-b-2 border-solid bg-neutral1000 text-neutral50 border-b-neutral700">
          <Link to="/profile">
            <img src="../../public/images/user-avatar.svg" alt="user-icon" />
          </Link>
          <Image src={Logo100X} alt="100x-Logo" size="mx-auto w-14" />
        </header> */}
        <div className="flex w-screen h-screen re bg-neutral1000 text-neutral50">
          <header className="inline-flex flex-col items-center justify-between p-5 ">
            <div className="flex items-center justify-center w-full gap-4 md:flex-col bg-neutral1000">
              <Image
                src={Logo100X}
                alt="100x-Logo"
                size="mx-auto mx-5 my-3 w-14"
              />
              <Link
                to="/profile"
                className={isHomeActive ? "bg-transparent/60" : null}
              >
                <div className="inline-flex items-center justify-start h-12 gap-5 px-5 py-3 md:w-56">
                  <Image src={HomeIcon} alt="home-icon" />
                  {windowWidth > 760 && (
                    <p className="text-stone-50 text-lg font-medium font-['Inter'] hidden md:block">
                      Home
                    </p>
                  )}
                </div>
              </Link>
              <Link
                to="/profile"
                className={isHomeActive ? "bg-transparent/60" : null}
              >
                <div className="inline-flex items-center justify-start h-12 gap-5 px-5 py-3 md:w-56">
                  <Image src={Profile} alt="profile-icon" />
                  {windowWidth > 760 && (
                    <p className="text-stone-50 text-lg font-medium font-['Inter'] hidden md:block">
                      Profile
                    </p>
                  )}
                </div>
              </Link>
              <div className="p-3">
                <Button varient="bluebtn" customSize="w-56 h-12">
                  Post
                </Button>
              </div>
            </div>
            <ProileHandler />
          </header>
          <div className="w-6/12">
            <Nav />
          </div>
          <div className="px-5 flex-col gap-3 pt-2.5">
            <div className="pb-4">
              <Search />
            </div>
            <section className="items-start justify-start w-w01 fiex-col bg-zinc-900 rounded-2xl">
              <div className="w-80 h-11 px-3.5 py-2.5 justify-start items-center gap-2.5 inline-flex">
                What’s happening
              </div>
              <Trending />
              <div className="w-80 text-sky-500 h-12 p-3.5 justify-start items-start inline-flex">
                Show more
              </div>
            </section>
          </div>
        </div>
        {/* <section className="flex-col ">
          <div className="fixed bottom-0 flex items-center justify-center w-full h-6 gap-10 px-6 py-5 bg-neutral1000">
            <Link
              to="/profile"
              className={isHomeActive ? "bg-transparent/60" : null}
            >
              <div className="inline-flex items-center justify-start h-12 gap-5 px-5 py-3 md:w-60">
                <Image src={HomeIcon} alt="home-icon" />
                {windowWidth > 760 && (
                  <p className="text-stone-50 text-lg font-medium font-['Inter'] hidden md:block">
                    Home
                  </p>
                )}
              </div>
            </Link>
            <Link
              to="/profile"
              className={isHomeActive ? "bg-transparent/60" : null}
            >
              <div className="inline-flex items-center justify-start h-12 gap-5 px-5 py-3 md:w-60">
                <Image src={Profile} alt="profile-icon" />
                {windowWidth > 760 && (
                  <p className="text-stone-50 text-lg font-medium font-['Inter'] hidden md:block">
                    Profile
                  </p>
                )}
              </div>
            </Link>
          </div>
        </section> */}
      </div>
    </>
  );
};

export default Home;
