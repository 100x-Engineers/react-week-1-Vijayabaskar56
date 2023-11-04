import { Formik } from "formik";
import { object, string, number } from "yup";
import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import DropDOwn from "../components/DropDOwn";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Temp() {
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
      <div className="flex-col items-center gap-8 w0ustify-center ">
        <section action className="inline-flex flex-col justify-between gap-8">
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
                    This will not be shown publicly. Confirm your own age, even
                    if this account is for a business, a pet, or something else.
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
    </>
  );
}

export default Temp;
