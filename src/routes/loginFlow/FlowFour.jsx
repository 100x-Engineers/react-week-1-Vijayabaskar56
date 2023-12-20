import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import PropTypes from "prop-types";
import { useAuth } from "../context/Auth.js";
import { password } from "../../utils/api";

const FlowFour = ({ nextStep, userInfo }) => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  return (
    <>
      <div className="flex-col items-center justify-center">
        <Formik
          initialValues={{ password: "" }}
          // validate=
          onSubmit={async (values, { setSubmitting }) => {
            const payload = {
              password: values,
              email: userInfo.email,
            };
            try {
              await password(payload)
                .then((data) => {
                  console.log(data, data.data.accessToken);
                  // Assuming AuthService returns an object with a data property
                  if (data.data.accessToken && data.data.userid) {
                    setToken(data.data.accessToken);
                  } else {
                    throw new Error("Authentication failed");
                  }
                })
                .catch((error) => {
                  console.error(error);
                })
                .finally(() => {
                  console.log("hi from login");
                  setSubmitting(false);
                  // navigate("/");
                });
            } catch (error) {
              console.error(error);
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
                    type="submit"
                    text="Next"
                    disabled={isSubmitting}
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

export default FlowFour;

FlowFour.propTypes = {
  nextStep: PropTypes.func,
};
