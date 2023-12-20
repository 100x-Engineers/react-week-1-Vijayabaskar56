import { ErrorMessage, Field, Formik } from "formik";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { object, string } from "yup";
import HeaderImg from "../../assets/image-17.png";
import Arrow from "../../assets/back.svg";
import AddBanner from "../../assets//material-symbols-add-a-photo-outline.svg";
import RemoveBanner from "../../assets/cancel.svg";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import AvatarUpload from "../../components/AvatharUpload";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { editProfile } from "../../utils/api";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_ANON_KEY
);

const EditProfile = () => {
  const [selectimage, setSelectImage] = useState(null);
  const { users, setUser } = useUser();
  // const [iimageURLs, setImageURls] = useState([]);
  const navigate = useNavigate();

  const validation = object({
    name: string("Invalid Entry")
      .required("Name Required!")
      .max(20, "Name should be 20 letter's"),
    location: string("Invalid Entry").required("Email Requried"),
    website: string("invalid Entry").url("Not a valid url"),
    bio: string().max(160, "160 Characters only"),
  });

  return (
    <>
      <div className="h-full bg-neutral1000 text-neutral50">
        <main className="flex flex-col gap-5 px-4 py-3">
          <Formik
            initialValues={{
              name: "",
              location: "",
              website: "",
              bio: " ",
            }}
            validationSchema={validation}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              const userInfo = {
                userId: users.id,
                displayName: values.name,
                location: values.location,
                website: values.website,
                bio: values.bio,
              };
              editProfile(userInfo)
                .then((data) => {
                  resetForm();
                  setSubmitting(false);
                  setUser(data.data.user);
                  navigate(-1);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
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
              isSubmitting && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
                  {" "}
                  <div className="w-32 h-32 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>{" "}
                </div>
              ),
              (
                <form
                  onSubmit={handleSubmit}
                  className="inline-flex flex-col justify-between gap-8"
                >
                  <header className="flex items-center justify-between px-4 py-3">
                    <div className="flex gap-5">
                      {/* Back arrow */}
                      <button onClick={() => navigate(-1)}>
                        <img src={Arrow} alt="back-arrow-icon" />
                      </button>
                      <p>Edit Profile</p>
                    </div>
                    <Button
                      varient="base"
                      buttonsize="sm"
                      type="submmit"
                      disabled={isSubmitting}
                    >
                      Save
                    </Button>
                  </header>
                  <div className="relative self-stretch">
                    <div className="absolute flex items-center justify-center gap-4 -translate-x-1/2 -translate-y-1/2 bg-transparent top-1/2 left-1/2 opacity-60">
                      <image
                        src={AddBanner}
                        alt="add-icon"
                        className="p-2 rounded-full cursor-pointer bg-neutral900shade"
                      />
                      <image
                        src={RemoveBanner}
                        alt="cancel-icon"
                        className="p-2 rounded-full cursor-pointer bg-neutral900shade"
                        // onClick={() =>
                        //   document.getElemetnById("fileInput").click()
                        // }
                      />
                    </div>
                    <img
                      src={HeaderImg}
                      alt="banner"
                      className="w-screen h-52"
                    />
                  </div>
                  <AvatarUpload
                    url={
                      "https://doeoysbmfjhppaimcttr.supabase.co/storage/v1/object/public/avathars/user-avatar.svg"
                    }
                  />

                  <InputField
                    name="name"
                    type="text"
                    placeholder="Name"
                    defaultvalue={users.displayName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    errors={errors.name}
                    touched={touched.name}
                  />
                  <InputField
                    name="location"
                    type="location"
                    placeholder="location"
                    defaultvalue={
                      users.location === null ? " " : users.location
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    errors={errors.location}
                    touched={touched.location}
                  />
                  <InputField
                    name="website"
                    type="website"
                    placeholder="Website"
                    defaultvalue={users.website === null ? " " : users.website}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    errors={errors.website}
                    touched={touched.website}
                  />

                  <div className="flex-col">
                    <fieldset className="flex items-center self-stretch px-3 py-4 pt-2 border border-solid rounded group border-neutral-500 focus-within:border-blue-400">
                      <legend className="text-xs not-italic font-medium leading-normal text-neutral-500 group-focus-within:text-blue-400">
                        Bio
                      </legend>
                      <Field
                        as="textarea"
                        id="bio"
                        name="bio"
                        rows="3"
                        cols="40"
                        defaultvalue={users.bio === null ? " " : users.bio}
                        onChange={handleChange}
                        className="w-full bg-transparent text-neutral-50 placeholder:text-neutral-500 focus:outline-none"
                        placeholder="What's happening?!"
                      />
                    </fieldset>
                    <ErrorMessage
                      name="bio"
                      component="div"
                      className="text-red-700"
                    />
                  </div>
                </form>
              )
            )}
          </Formik>
        </main>
      </div>
    </>
  );
};

export default EditProfile;
