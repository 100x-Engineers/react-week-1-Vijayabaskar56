import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo100X from "../../assets/100x-frame.svg";
import Image from "../../components/Image";
import Profile from "../../assets/group-default.svg";
import HomeIcon from "../../assets/home-default.svg";

const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const base =
    "pb-3 text-base font-medium text-center whitespace-nowrap font-px-secondary";
  const seleted = "text-neutral-500 border-twitterBlue border-b-2";

  return (
    <>
      <div className="bg-neutral1000 text-neutral50">
        <header className="flex justify-start px-4 py-3 border-b-2 border-solid border-b-neutral700">
          <Link to="/profile">
            <img src="../../public/images/user-avatar.svg" alt="user-icon" />
          </Link>
          <Image src={Logo100X} alt="100x-Logo" size="mx-auto w-14" />
        </header>
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
        <Outlet />
        <section>
          <div className="fixed bottom-0 flex items-center justify-center w-full h-6 gap-10 px-6 py-5 bg-neutral1000">
            <Link to="/profile">
              <Image src={HomeIcon} alt="home-icon" />
            </Link>
            <Link to="/profile">
              <Image src={Profile} alt="profile-icon" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Nav;
