import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import Image from "../../components/Image";
import Logo100X from "../../assets/100x-frame.svg";
import Nav from "./Nav";
import Profile from "../../assets/group-default.svg";
import HomeIcon from "../../assets/home-default.svg";

import TrandingPage from "./TrendingPage";
import Header from "./componenets/Header";

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
        {windowWidth < 760 && (
          <header className="flex justify-start px-4 py-3 border-b-2 border-solid bg-neutral1000 text-neutral50 border-b-neutral700">
            <Link to="/profile">
              <img src="../../public/images/user-avatar.svg" alt="user-icon" />
            </Link>
            <Image src={Logo100X} alt="100x-Logo" size="mx-auto w-14" />
          </header>
        )}

        <div className="flex w-screen h-screen re bg-neutral1000 text-neutral50">
          {windowWidth > 760 && <Header />}
          <section className="flex w-full overflow-scroll scroll-m-0 scroll-smooth">
            <div className="w-full border-r-2 border-gray-800 md:max-w-xl">
              <Nav />
            </div>
            {windowWidth > 988 && <TrandingPage />}
          </section>
        </div>
        {windowWidth < 760 && (
          <section className="flex-col">
            <div className="fixed bottom-0 flex items-center justify-center w-full h-6 gap-10 px-6 py-5 bg-neutral1000">
              <Link
                to="/profile"
                className={isHomeActive ? "bg-transparent/60" : null}
              >
                <div className="inline-flex items-center justify-start h-12 gap-5 px-5 py-3 md:w-60">
                  <Image src={HomeIcon} alt="home-icon" />
                </div>
              </Link>
              <Link
                to="/profile"
                className={isHomeActive ? "bg-transparent/60" : null}
              >
                <div className="inline-flex items-center justify-start h-12 gap-5 px-5 py-3 md:w-60">
                  <Image src={Profile} alt="profile-icon" />
                </div>
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Home;
