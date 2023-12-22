import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import avatarImg from "../assets/user-avatar.svg";
import AddBanner from "../assets//material-symbols-add-a-photo-outline.svg";
import { useUser } from "../routes/context/UserContext";
import axios from "axios";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_ANON_KEY
);

function AvatarUpload({ url }) {
  //   const fileInput = useRef(null);
  const { users } = useUser();
  const [imageUrl, setImageUrl] = useState(url);
  const [showOverlay, setShowOverlay] = useState(false);

  const appUrl = import.meta.env.VITE_APP_API_URL;

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setShowOverlay(true);
    const { data, error } = await supabase.storage
      .from("avathars")
      .upload(`avatar_${users.id}.png`, file)
      .then(() => {
        getimage();
      });
    setShowOverlay(false);
    if (error) {
      console.error(error);
      return;
    }
  };

  const getimage = async () => {
    const publicURL = await supabase.storage
      .from("avathars")
      .getPublicUrl(`avatar_${users.id}.png`);
    const {
      data: { publicUrl },
    } = publicURL;
    setImageUrl(publicUrl);
    setShowOverlay(false);
    postImage(publicUrl);
  };

  const postImage = async (imageUrl) => {
    await axios
      .post(`${appUrl}/uploadProfile/${users.id}`, { imageUrl })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="relative w-24 h-24 overflow-hidden bg-gray-800 border-2 border-gray-300 rounded-full cursor-pointer">
      {imageUrl ? (
        <img src={imageUrl} className="object-cover w-full h-full" />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-gray-500 cursor-pointer">
          <image
            src={AddBanner}
            alt="add-icon"
            className="z-10 p-2 rounded-full cursor-pointer bg-neutral900shade"
          />
        </div>
      )}
      <label
        htmlFor="avatar-upload"
        className="absolute inset-0 opacity-0 cursor-pointer"
      >
        <span className="sr-only">Upload avatar</span>
        <input
          id="avatar-upload"
          type="file"
          onChange={handleFileInputChange}
          className="w-full h-full"
        />
      </label>
      {showOverlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-500 opacity-50 cursor-pointer">
          {/* Your SVG icon here */}
        </div>
      )}
    </div>
  );
}

export default AvatarUpload;
