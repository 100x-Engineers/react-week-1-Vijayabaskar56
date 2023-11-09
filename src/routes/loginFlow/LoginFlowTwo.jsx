import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Image from "../../components/Image";
import Singup from "../../assets/signup-x.svg";
import { useProfile } from "../context/login";

const LoginFlow = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [profileDetails] = profile;
  console.log(profile, "from logintwo");
  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <section className="inline-flex flex-col items-center justify-between w-full h-screen md:w-4/12 md:h-3/5 md:rounded-2xl md:flex">
          <div className="self-stretch px-3.5 py-5 md:rounded-2xl flex-col justify-start items-start gap-3 inline-flex  bg-neutral1000 ">
            <div className="flex flex-col items-start justify-center gap-3">
              <div className="inline-flex items-center self-stretch justify-start gap-5 px-4 py-3">
                <button>
                  <Image src={Singup} alt="back-btn" />
                </button>
                <div className="text-base font-bold text-neutral50">
                  Step 2 of 4
                </div>
              </div>
            </div>
            <section className="flex-col self-stretch justify-start">
              <p className="pb-5 text-2xl font-bold text-stone-50">
                Create your account
              </p>
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
                      onClick={() => navigate("/loginThree")}
                    >
                      Post
                    </Button>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default LoginFlow;
