import React from "react";
import InputField from "../../components/InputField";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/login";
import Button from "../../components/Button";

const FlowTwo = ({ nextStep }) => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [profileDetails] = profile;
  return (
    <>
      <div className="flex-col items-center justify-center gap-8">
        <section
          action
          className="inline-flex flex-col justify-between w-full gap-8"
        >
          <InputField
            name="name"
            type="text"
            label="name"
            value={profileDetails.name}
          />
          <InputField
            name="email"
            type="email"
            label="email"
            value={profileDetails.email}
          />
          <InputField
            name="DOB"
            type="num"
            label="DOB"
            value={profileDetails.dateOfBirth}
          />
          <div className="m-auto">
            <Button
              varient="bluebtn"
              buttonsize="lg"
              onClick={() => nextStep()}
            >
              Post
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default FlowTwo;
