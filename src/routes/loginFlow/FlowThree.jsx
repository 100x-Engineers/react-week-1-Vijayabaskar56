import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { useFlow } from "../context/FlowNav";

const FlowThree = ({ nextStep }) => {
  const navigate = useNavigate();
  // const { flow, nextStep } = useFlow();
  // const next = nextStep;
  // console.log(flow, "from two", next);
  // let [currentState] = flow;
  return (
    <>
      <div className="flex-col items-center justify-center">
        <Formik
          initialValues={{ VerificationCode: "" }}
          // validate=
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              nextStep();
              // navigate("/loginFour");
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
              <div className="flex-col items-end justify-end gap-0">
                <InputField
                  name="verificationCode"
                  type="number"
                  placeholder="Verification Code"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  disabled={isSubmitting}
                />
                <a
                  href="#"
                  className="text-sm font-normal text-right text-sky-500 font-inter"
                >
                  Didn't & receive a code?
                </a>
              </div>

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
                    // onClick={() => {navigate("/loginFour")}}
                  >
                    <p className="font-normal">Next</p>
                  </Button>
                </div>
              </section>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FlowThree;
