import Image from "../../components/Image";
import x100Logo from "../../assets/100x-frame.svg";
import Button from "../../components/Button";
import { createPortal } from "react-dom";
// import Modal from "./Modal";
import Modal from "./Model";
import PropTypes from "prop-types";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

const WelcomePage = (getProfileDetais) => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModelSignin, setShowModalSignin] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowModalSignin(true);
    navigate("/");
  };

  return (
    <>
      <div className="flex-col md:flex-row flex h-screen w-screen md:gap-28 items-center justify-center bg-black font-['Inter']">
        <div className="flex-col">
          <section className="justify-center top-0 items-center md:items-end gap-0.5 py-3 flex">
            <Image
              src={x100Logo}
              alt="100x-logo"
              size={"md:w-w02 md:h-48 w-14 h-4"}
            />
          </section>
        </div>
        <section className="inline-flex flex-col items-start justify-start gap-10 my-auto w-w03 h px-7">
          <div className="flex flex-col items-start justify-start object-contain gap-3">
            <h1 className="font-bold text-stone-50 text-fs02 md:text-fs01 whitespace-nowrap">
              Happening now
            </h1>
            <h2 className="text-base font-bold text-stone-50 md:text-2xl">
              Join today.
            </h2>
          </div>
          <Button varient="base" buttonsize="md" onClick={() => handleClick()}>
            Create Account
          </Button>
          {showModelSignin &&
            createPortal(
              <Modal
                close={() => setShowModalSignin(false)}
                step={1}
                getProfileDetails={getProfileDetais}
              />,
              document.body
            )}

          {/* <Outlet /> */}
          <section className="inline-flex items-center justify-center h-5 gap-1 w-80">
            <span className="h-px border grow shrink basis-0 border-neutral-700" />
            <span className="text-center text-stone-50 text-base font-['Chirp']">
              or
            </span>
            <span className="h-px border grow shrink basis-0 border-neutral-700" />
          </section>
          <section className="flex flex-col items-start self-stretch justify-start h-20 gap-5">
            <p className="text-stone-50 md:text-xl font-medium font-['Inter']">
              Already have an account?
            </p>
            {/* <Link to="/e" state={{ background: location }}> */}
            <Button
              varient="outline"
              buttonsize="md"
              onClick={() => setShowModalLogin(true)}
            >
              Sign up
            </Button>
            {showModalLogin &&
              createPortal(
                <Modal close={() => setShowModalLogin(false)} step={0} />,
                document.body
              )}
          </section>
        </section>
      </div>
    </>
  );
};

export default WelcomePage;

WelcomePage.propTypes = {
  close: PropTypes.func.isRequired,
  getProfileDetails: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};
