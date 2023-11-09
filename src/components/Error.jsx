import { useRouteError } from "react-router-dom";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Error = ({ onClose }) => {
  const navigator = useNavigate();
  const error = useRouteError();

  const handleclose = () => {
    if (error) navigator("/");
  };

  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 w-screen h-screen bg-twitterBluedefault/50"></div>
      <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="inline-flex flex-col items-start justify-start gap-10 p-10 text-2xl font-bold bg-black text-stone-50 w-96 h-60 rounded-2xl">
          {!error && (
            <div className="flex flex-col items-start self-stretch justify-start h-20 gap-3">
              <h3>Error</h3>
              <p className="self-stretch text-neutral-500 text-sm font-normal font-['Inter']">
                Oops, something went wrong. Please try again later.
              </p>
            </div>
          )}
          {error && (
            <>
              <div className="flex flex-col items-start self-stretch justify-start h-20 gap-3">
                <h3>{error.statusText}</h3>
                <p className="self-stretch text-neutral-500 text-sm font-normal font-['Inter']">
                  <i>{error.message}</i>
                </p>
              </div>
            </>
          )}
          <div className="self-stretch  rounded-3xl shadow backdrop-blur-2xl justify-center items-center gap-2.5 inline-flex">
            <Button
              varient="base"
              buttonsize="md"
              onClick={error ? handleclose : onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
