import React from "react";
import Avatar from "./Avatar";
import LogoutIcon from "../../../assets/log-out.svg";

const Logout = ({ username, displayname, profilePicUrl }) => {
  const handleClick = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      <div className="inline-flex items-center justify-between h-10 w-60">
        <div className="flex items-start justify-start gap-3">
          <Avatar Avatar={profilePicUrl} />
          <div className="inline-flex flex-col items-start justify-start">
            <div className="text-stone-50 text-base font-bold font-['Inter']">
              {username}
            </div>
            <div className="text-neutral-500 text-base font-normal font-['Inter']">
              {`@${displayname}`}
            </div>
          </div>
        </div>
        <button
          className="rounded-full w-6 h-6 flex items-center"
          onClick={() => handleClick()}
        >
          <img src={LogoutIcon} alt="logout-icon" className="z-10 w-8 h-8" />
        </button>
      </div>
    </>
  );
};

export default Logout;
