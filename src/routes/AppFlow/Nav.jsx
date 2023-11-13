import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const base =
    "pb-3 text-base font-medium text-center whitespace-nowrap font-px-secondary";
  const seleted = "text-neutral-500 border-twitterBlue border-b-2";

  return (
    <>
      <div className="h-screen">
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
