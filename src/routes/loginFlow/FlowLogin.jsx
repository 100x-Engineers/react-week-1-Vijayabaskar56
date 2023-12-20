import { Formik } from "formik";
import { object, string } from "yup";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { AuthService } from "../../services/AuthService";
import { useAuth } from "../context/Auth";

function FlowLogin() {
  //   const { getProfileDetais } = useProfile();
  const { setToken, token } = useAuth();
  const validation = object({
    email: string("Invalid Entry")
      .required("Name Required!")
      .email("Invalid Entry"),
    password: string("Invalid password")
      .required("password Requried")
      .max(20, "Name should be 20 letter's"),
  });
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validation}
        onSubmit={({ email, password }, { setSubmitting }) => {
          try {
            AuthService(email, password)
              .then((response) => {
                console.log(response, response.accessToken, response.userid);
                // Assuming AuthService returns an object with a data property
                if (response.accessToken) {
                  setToken(response.accessToken);
                } else {
                  throw new Error("Authentication failed");
                }
              })
              .catch((error) => {
                console.error(error);
              })
              .finally(() => {
                console.log("hi from login", token);
                setSubmitting(false);
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
            className="inline-flex flex-col justify-between gap-3"
          >
            <InputField
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              disabled={isSubmitting}
              errors={errors.email}
              touched={touched.email}
            />
            <InputField
              name="password"
              type="password"
              placeholder="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              disabled={isSubmitting}
              errors={errors.password}
              touched={touched.password}
            />
            <div className="m-auto h-2/6 pt-28 md:pt-20">
              <Button
                varient="base"
                type="submmit"
                buttonsize="md"
                disabled={isSubmitting}
              >
                Login
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export default FlowLogin;
