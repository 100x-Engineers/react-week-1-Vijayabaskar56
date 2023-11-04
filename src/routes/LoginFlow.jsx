import React from "react";
import { Formik } from "formik";
import { object, string, number } from "yup";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Singup from "../assets/signup-x.svg";
import Image from "../components/Image";
import Temp from "./Temp";

const LoginFlow = ({ heading, subHeading }) => (
  // const validation = object({})
  <div className="inline-flex flex-col items-center justify-between w-full h-screen md:w-4/12 md:h-3/5 md:rounded-2xl bg-neutral1000 md:flex">
    <div className="self-stretch px-3.5 py-2.5 md:rounded-2xl flex-col justify-start items-start gap-3 inline-flex">
      <div className="flex flex-col items-start justify-center gap-3">
        <div className="inline-flex items-center self-stretch justify-start gap-5 px-4 py-3">
          <button>
            <Image src={Singup} alt="back-btn" />
          </button>
          <div className="text-base font-bold text-neutral50">Step 1 of 4</div>
        </div>
      </div>
      <section className="flex-col self-stretch justify-start gap-10">
        <p className="pb-10 text-2xl font-bold text-stone-50">
          {heading}
          <span className="block text-sm font-normal w-96 text-neutral-500 font-inter">
            {subHeading}
          </span>
        </p>
        <Temp />
      </section>
    </div>
  </div>
);

export default LoginFlow;
