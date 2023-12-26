import { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useMatch } from "react-router-dom";
import Image from "../../components/Image";
import Logo100X from "../../assets/100x-frame.svg";
import Profile from "../../assets/group-default.svg";
import HomeIcon from "../../assets/home-default.svg";
import Loader from "../../components/Loader";
import TrandingPage from "./TrendingPage";
import Header from "./componenets/Header";
import Logout from "./componenets/Logout";
import { useUser } from "../context/UserContext";
const Home = () => {
  const isHomeActive = useMatch("/");
  const { users } = useUser();
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

  return (
    <>
      <div className="flex-col-reverse">
        {windowWidth < 760 && (
          <header className="flex justify-start px-4 py-3 border-b-2 border-solid bg-neutral1000 text-neutral50 border-b-neutral700">
            <Link to="/profile">
              <img
                src={users.profilePicUrl}
                className="w-12 h-12 rounded-full"
                alt="user-icon"
              />
            </Link>
            <Image src={Logo100X} alt="100x-Logo" size="mx-auto w-14" />
          </header>
        )}

        <div className="flex w-screen h-screen overflow-hidden re bg-neutral1000 text-neutral50 scroll-smooth hide-scrollbar ">
          {windowWidth > 760 && <Header />}
          <section className="flex w-full overflow-scroll scroll-m-0 scroll-smooth">
            <div className="w-full border-r-2 border-gray-800 md:max-w-xl">
              {/* <Nav /> */}
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </div>
            {windowWidth > 988 && <TrandingPage />}
          </section>
        </div>
        {windowWidth < 760 && (
          <>
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
            <button className="fixed right-5 transform -translate-x bottom-14 w-16 h-16 p-4 bg-twitterBluedefault rounded-full shadow justify-start items-start gap-2.5 inline-flex">
              <Link to="/postTweet">
                <img
                  src="../../public/images/content-add.svg"
                  alt="plus-icon"
                />
              </Link>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
