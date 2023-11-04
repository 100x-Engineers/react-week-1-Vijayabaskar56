import { Field, Formik } from "formik";
import { object, string, number } from "yup";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import DropDOwn from "../components/DropDOwn";
import Singup from "../assets/signup-x.svg";
import Image from "../components/Image";

const LoginFlowOne = () => {
  const navigate = useNavigate();

  const validation = object({
    name: string("Invalid Entry")
      .required("Name Required!")
      .max(20, "Name should be 20 letter's"),
    email: string("Invalid Entry")
      .email("Invalid Entry")
      .required("Email Requried"),
    month: string().required("Selecte Month"),
    day: number().required("Select Date"),
    year: number().required("Select year"),
  });
  return (
    <>
      <div className="inline-flex md:bg-transparent md:flex md:justify-center">
        <div className="h-screen  self-stretch px-3.5 py-2.5 bg-black md:rounded-2xl flex-col justify-start gap-3 inline-flex">
          <div className="flex flex-col items-start justify-center gap-3 ">
            <div className="inline-flex items-center self-stretch justify-start gap-5 px-4 py-3">
              <button onClick={() => navigate(-1)}>
                <Image src={Singup} alt="back-btn" />
              </button>
              <div className="text-base font-bold text-neutral50">
                Step 1 of 4
              </div>
            </div>
          </div>
          <section className="flex-col self-stretch justify-start h-5/6">
            <h1 className="pb-5 text-2xl font-bold text-stone-50">
              Create your account
            </h1>
            <div className="flex-col items-center gap-8 w0ustify-center ">
              <section
                action
                className="inline-flex flex-col justify-between gap-8"
              >
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    month: "",
                    day: "",
                    year: "",
                  }}
                  validationSchema={validation}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                      console.log(values);
                      resetForm();
                      setSubmitting(false);
                    }, 3000);
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
                      className="inline-flex flex-col justify-between gap-8"
                    >
                      <InputField
                        name="name"
                        type="text"
                        placeholder="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        disabled={isSubmitting}
                        errors={errors.name}
                        touched={touched.name}
                      />
                      <InputField
                        name="email"
                        type="email"
                        placeholder="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        disabled={isSubmitting}
                        errors={errors.email}
                        touched={touched.email}
                      />
                      <section className="flex-col items-start gap-2">
                        <h2 className="text-sm font-bold">Date of birth</h2>
                        <p className="text-sm text-Secondary">
                          This will not be shown publicly. Confirm your own age,
                          even if this account is for a business, a pet, or
                          something else.
                        </p>
                      </section>
                      <section className="flex justify-evenly">
                        <div className="flex items-start self-stretch w-full gap-3">
                          <DropDOwn
                            name="month"
                            value={values.month}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                          />
                          <DropDOwn
                            name="day"
                            value={values.day}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                          />
                          <DropDOwn
                            name="year"
                            value={values.year}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                          />
                        </div>
                      </section>
                      <div className="m-auto h-2/6 pt-28">
                        <Button
                          varient="base"
                          buttonsize="md"
                          type="submmit"
                          disabled={isSubmitting}
                          onClick={() => navigate("/logintwo")}
                        >
                          Create account
                        </Button>
                      </div>
                    </form>
                  )}
                </Formik>
              </section>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LoginFlowOne;
