import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo100X from "../../assets/100x-frame.svg";
import Image from "../../components/Image";
import Profile from "../../assets/group-default.svg";
import HomeIcon from "../../assets/home-default.svg";
import { useMatch } from "react-router-dom";

const Nav = () => {
  const isHomeActive = useMatch("/");
  const isprofileActive = useMatch("profile");
  const [isActive, setIsActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const base =
    "pb-3 text-base font-medium text-center whitespace-nowrap font-px-secondary";
  const seleted = "text-neutral-500 border-twitterBlue border-b-2";

  return (
    <>
      <div className="">
        <header className="flex justify-start px-4 py-3 border-b-2 border-solid bg-neutral1000 text-neutral50 border-b-neutral700">
          <Link to="/profile">
            <img src="../../public/images/user-avatar.svg" alt="user-icon" />
          </Link>
          <Image src={Logo100X} alt="100x-Logo" size="mx-auto w-14" />
        </header>
        <div className="bg-neutral1000 text-neutral50 ">
          <nav className="">
            <div className="inline-flex items-center justify-around w-screen pt-5 border-b h-fit border-neutral700">
              <button
                className={`${base} ${isActive ? seleted : null}`}
                onClick={() => {
                  setIsActive(!isActive);
                  navigate("foryou");
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
        <Outlet />
        <section className="flex-col">
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
        </section>
      </div>
    </>
  );
};

export default Nav;
