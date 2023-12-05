import { ErrorMessage, Field, Formik } from "formik";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { object, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import HeaderImg from "../../assets/image-17.png";
import Arrow from "../../assets/back.svg";
import AddBanner from "../../assets//material-symbols-add-a-photo-outline.svg";
import RemoveBanner from "../../assets/cancel.svg";
import { useEffect, useState } from "react";
import axios from "axios";

const EditProfile = () => {
  const [selectimage, setSelectImage] = useState(null);
  // const [iimageURLs, setImageURls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadImageAsBlob = (imagePath) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "arraybuffer";

        xhr.onload = () => {
          if (xhr.status === 200) {
            const blob = new Blob([xhr.response], { type: "image/png" });
            resolve(blob);
          } else {
            reject(new Error("Failed to load image."));
          }
        };

        xhr.open("GET", imagePath);
        xhr.send();
      });
    };

    // Usage
    loadImageAsBlob(HeaderImg)
      .then((blob) => {
        // console.log(blobUrl)
        setSelectImage(URL.createObjectURL(blob));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const validation = object({
    name: string("Invalid Entry")
      .required("Name Required!")
      .max(20, "Name should be 20 letter's"),
    location: string("Invalid Entry").required("Email Requried"),
    website: string("invalid Entry").url("Not a valid url"),
    bio: string().max(160, "160 Characters only"),
  });

  function onImageChange(e) {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectImage(imageUrl);
    }
  }

  return (
    <>
      <div className="h-screen bg-neutral1000 text-neutral50">
        <main className="flex flex-col gap-5 px-4 py-3">
          <Formik
            initialValues={{
              name: "vj-bass",
              location: "madurai",
              website: "https://www.google.com",
              bio: " ",
            }}
            validationSchema={validation}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              axios
                .post("http://localhost:3000/editProfile", {
                  userId: 49,
                  displayName: values.name,
                  location: values.location,
                  website: values.website,
                  bio: values.bio,
                })
                .then((data) => {
                  console.log(data);
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
              <form
                onSubmit={handleSubmit}
                className="inline-flex flex-col justify-between gap-8"
              >
                <header className="flex items-center justify-between px-4 py-3">
                  <div className="flex gap-5">
                    {/* Back arrow */}
                    <Link to="">
                      <img src={Arrow} alt="back-arrow-icon" />
                    </Link>
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
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                      className="p-2 rounded-full cursor-pointer bg-neutral900shade"
                    />
                    <image
                      src={RemoveBanner}
                      alt="cancel-icon"
                      className="p-2 rounded-full cursor-pointer bg-neutral900shade"
                      onClick={() =>
                        document.getElemetnById("fileInput").click()
                      }
                    />
                  </div>
                  <img
                    src={selectimage}
                    alt="banner"
                    className="w-screen h-52"
                  />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  className="hidden"
                  name="myImage"
                  multiple={false}
                  onChange={(e) => {
                    onImageChange(e);
                  }}
                />
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
                  name="location"
                  type="location"
                  placeholder="location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  disabled={isSubmitting}
                  errors={errors.location}
                  touched={touched.location}
                />
                <InputField
                  name="website"
                  type="website"
                  placeholder="Website"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.website}
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
                      onChange={handleChange}
                      className="w-full bg-transparent text-neutral-50 placeholder:text-neutral-500 focus:outline-none"
                      placeholder="What's happening?!"
                      defaultValue={
                        "Digital Goodies Team - Web & Mobile UI/UX development; Graphics; Illustrations\n    "
                      }
                    />
                  </fieldset>
                  <ErrorMessage
                    name="bio"
                    component="div"
                    className="text-red-700"
                  />
                </div>
              </form>
            )}
          </Formik>
        </main>
      </div>
    </>
  );
};

export default EditProfile;
