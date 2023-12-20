import { Formik } from "formik";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import PropTypes from "prop-types";
import { verificationCode } from "../../utils/api";

const FlowThree = ({ nextStep, userInfo }) => {
  return (
    <>
      <div className="flex-col items-center justify-center">
        <Formik
          initialValues={{ VerificationCode: "" }}
          // validate=
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            const payload = {
              email: userInfo.email,
            };
            try {
              verificationCode(payload)
                .then((data) => console.log(data))
                .then(() => nextStep())
                .catch((err) => console.log(err));
            } catch (error) {
              setSubmitting(false);
              console.log(error);
            }
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
                  Didn&apos;t & receive a code?
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
                    type="submit"
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

FlowThree.propTypes = {
  nextStep: PropTypes.func.isRequired,
};
