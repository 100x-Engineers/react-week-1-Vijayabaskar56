import InputField from "../../components/InputField";
import { useProfile } from "../context/login";
import Button from "../../components/Button";
import PropTypes from "prop-types";
import { useState } from "react";

const FlowTwo = ({ nextStep, userInfo }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [iserror, setIsError] = useState(false);

  const handleClick = async () => {
    try {
      setIsSubmitting(true);
      await fetch("http://localhost:3000/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((res) =>
          res.status == 200 ? nextStep() : new Error(res.message)
        );
      setIsSubmitting(false);
      nextStep();
    } catch (err) {
      setIsError(true);
      console.log(userInfo);
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex-col items-center justify-center gap-8">
        {iserror && <div className="text-red-500">Something went wrong</div>}
        {isSubmitting && <div className="text-blue-500">Loading...</div>}
        <section
          action
          className="inline-flex flex-col justify-between w-full gap-8"
        >
          <InputField
            name="name"
            type="text"
            label="name"
            value={userInfo.username}
          />
          <InputField
            name="email"
            type="email"
            label="email"
            value={userInfo.email}
          />
          <InputField
            name="DOB"
            type="num"
            label="DOB"
            value={userInfo.dateOfBirth}
          />
          <div className="m-auto">
            <Button varient="bluebtn" buttonsize="lg" onClick={handleClick}>
              Post
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default FlowTwo;

FlowTwo.propTypes = {
  nextStep: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};
