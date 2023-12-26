import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import UserProfile from "../../../assets/user-avatar.svg";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Image from "../../../components/Image";
import { postTweet } from "../../../utils/api";

const ReplyTweetComponent = () => {
  const [charCount, setcharCount] = useState(0);
  const navigate = useNavigate();
  // const { tweet, postTweet } = useTweet();
  const [tweets, settweet] = useState(" ");
  const { users } = useUser();
  const handleChange = (e) => {
    let count = e.target.value;
    setcharCount(count.length);
    let tweet = e.target.value;
    settweet(tweet);
    console.log(tweet);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tweets) return;
    const payload = {
      content: tweets,
      userId: users.id,
    };
    postTweet(payload);
    settweet("");
    navigate(-1);
  };

  return (
    <section className="relative flex flex-row items-start justify-center w-full gap-3 px-4 py-2 ">
      <div className="absolute -left-[2px] z-10 inline-flex min-h-[50%] h-full translate-x-8 border-2 border-gray-500/50"></div>
      <div className="relative flex-grow h-full ">
        <Image
          src={UserProfile}
          alt="user-avatar"
          className="relative top-0 z-20 h-fit mg-auto "
        />
      </div>
      <div className="block w-full">
        <TextareaAutosize
          name="tweerInput"
          id="tweerInput"
          minRows={3}
          maxRows={6}
          maxLength={300}
          style={{
            resize: "vertical",
          }}
          cacheMeasurements
          className={`bg-black  resize-y focus:outline-none w-full h-full overflow-y-hidden block caret-twitterBlue text-lg font-medium placeholder:text-neutral600 ${
            charCount < 280 ? "text-neutral-50" : "text-red-700"
          }`}
          placeholder="What's happening?!"
          // value={tweet}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </section>
  );
};

export default ReplyTweetComponent;
