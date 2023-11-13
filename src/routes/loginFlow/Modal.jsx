import Singup from "../../assets/signup-x.svg";
import Image from "../../components/Image";
import Button from "../../components/Button";
import FlowOne from "./FlowOne";
import FlowThree from "./FlowThree";
import FlowTwo from "./FlowTwo";
import FlowFour from "./FlowFour";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useFlow } from "../context/FlowNav";
import FlowLogin from "./FlowLogin";

const LoginFlow = ({ Children, close, getProfileDetails, step }) => {
  const [currentStep, setCurrentStep] = useState(step);

  const nextStep = () => {
    if (currentStep < 4) {
      console.log("executed");
      setCurrentStep(currentStep + 1);
    }
    console.log("fuckkk", currentStep);
  };
  console.log("fellllll", currentStep);

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      console.log("osidhfipasdhf", currentStep);
    }
  };

  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 md:w-screen md:h-screen md:bg-twitterBluedefault/50"></div>
      <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  bg-neutral1000  h-screen md:w-auto md:h-auto  self-stretch px-3.5 py-2.5 md:rounded-2xl flex-col justify-start items-start gap-3 inline-flex">
        <div className="inline-flex items-center self-stretch justify-start gap-5 px-4 py-3">
          {currentStep > 0 && (
            <Button
              varient="img"
              buttonsize="img"
              onClick={currentStep <= 1 ? close : previousStep}
            >
              <Image src={Singup} alt="back-btn" />
            </Button>
          )}

          {currentStep === 0 && (
            <Button varient="img" buttonsize="img" onClick={close}>
              <Image src={Singup} alt="back-btn" />
            </Button>
          )}
          <div className="text-base font-bold text-neutral50">
            {currentStep === 0 ? `Login` : `Step ${currentStep} of 4`}
          </div>
        </div>
        <section className="flex-col items-center self-stretch justify-start gap-10 px-4 py-3">
          {currentStep === 3 && (
            <p className="pb-3 text-2xl font-bold text-stone-50">
              We sent you a code
              <span className="block text-sm font-normal w-96 text-neutral-500 font-inter">
                Enter it below to verify janedoe@gmail.com
              </span>
            </p>
          )}
          <div className="flex-col items-center justify-center">
            {currentStep === 0 && <FlowLogin nextStep={nextStep} />}
            {currentStep === 1 && (
              <FlowOne
                nextStep={nextStep}
                getProfileDetais={getProfileDetails}
              />
            )}
            {currentStep === 2 && <FlowTwo nextStep={nextStep} />}
            {currentStep === 3 && <FlowThree nextStep={nextStep} />}
            {currentStep === 4 && <FlowFour nextStep={nextStep} />}
          </div>
        </section>
      </div>
    </>
  );
};

export default LoginFlow;
