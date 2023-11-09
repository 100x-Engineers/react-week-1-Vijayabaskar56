import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

const FlowFour = ({ nextStep }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex-col items-center justify-center">
        <Formik
          initialValues={{ password: "" }}
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
    </>
  );
};

export default FlowFour;
