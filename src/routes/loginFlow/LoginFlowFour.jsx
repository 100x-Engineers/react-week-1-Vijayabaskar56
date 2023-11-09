import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Singup from "../../assets/signup-x.svg";
import Image from "../../components/Image";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

const LoginFlowThree = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="inline-flex flex-col items-center justify-between w-full h-screen md:w-4/12 md:h-3/5 md:rounded-2xl md:flex">
          <div className="self-stretch px-3.5 py-2.5 md:rounded-2xl flex-col justify-start items-start gap-3 inline-flex  bg-neutral1000">
            <div className="flex flex-col items-start justify-center gap-3">
              <div className="inline-flex items-center self-stretch justify-start gap-5 px-4 py-3">
                <button>
                  <Image src={Singup} alt="back-btn" />
                </button>
                <div className="text-base font-bold text-neutral50">
                  Step 4 of 4
                </div>
              </div>
            </div>
            <section className="flex-col self-stretch justify-start gap-10">
              <p className="pb-10 text-2xl font-bold text-stone-50">
                You’ll need a password
                <span className="block text-sm font-normal w-96 text-neutral-500 font-inter">
                  Make sure it’s 8 characters or more
                </span>
              </p>
              <div className="flex-col items-center justify-center">
                <Formik
                  initialValues={{ password: "" }}
                  // validate=
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                      navigate("/loginFour");
                    }, 400);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="inline-flex flex-col justify-between w-full gap-40"
                    >
                      <InputField
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        disabled={isSubmitting}
                      />

                      {errors.email && touched.email && (
                        <div className="text-red-600">{errors.email}</div>
                      )}
                      <section className="flex-col items-start justify-end pb-5 mx-auto w-w03">
                        <div className="mx-4">
                          <Button
                            varient="base"
                            btnsize="md"
                            text="Next"
                            btntype="submmit"
                            disabled={isSubmitting}
                            onClick={() => {
                              navigate("/home/following");
                            }}
                          >
                            <p className="font-normal">Next</p>
                          </Button>
                        </div>
                      </section>
                    </form>
                  )}
                </Formik>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginFlowThree;
