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
      <div className="h-screen overflow-scroll scroll-m-0 scroll-smooth">
        <div className="bg-neutral1000 text-neutral50 ">
          <nav className="">
            <div className="inline-flex items-center justify-around w-full pt-5 border-b h-fit border-neutral700">
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
      </div>
    </>
  );
};

export default Nav;
