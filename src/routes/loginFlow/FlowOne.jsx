import { Formik } from "formik";
import { object, string, number, date } from "yup";
import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import DropDOwn from "../../components/DropDOwn";
import Button from "../../components/Button";
import { useProfile } from "../context/login";

function FlowOne({ nextStep, getProfileDetais }) {
  // const { getProfileDetais } = useProfile();

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
      <Formik
        initialValues={{
          name: "",
          email: "",
          month: "",
          day: "",
          year: "",
        }}
        validationSchema={validation}
        onSubmit={(
          { name, email, month, day, year },
          { setSubmitting, resetForm }
        ) => {
          setTimeout(() => {
            const dof = `${day}/${month}/${year}`;
            const profile = [
              {
                name: name,
                email: email,
                dateOfBirth: dof,
              },
            ];
            // getProfileDetais(profile);
            console.log(profile);
            // resetForm();
            setSubmitting(false);
            nextStep();
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
            className="inline-flex flex-col justify-between gap-3"
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
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
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
            <div className="m-auto h-2/6 pt-28 md:pt-20">
              <Button
                varient="base"
                type="submmit"
                buttonsize="md"
                disabled={isSubmitting}
              >
                Create account
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export default FlowOne;
