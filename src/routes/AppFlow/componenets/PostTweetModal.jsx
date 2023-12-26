import React, { useEffect, useState } from "react";
import TweetHeader from "./TweetHeader";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import Button from "../../../components/Button";
import Closebtn from "../../../assets/cancel.svg";
import Image from "../../../components/Image";
import TextareaAutosize from "react-textarea-autosize";
import { useUser } from "../../context/UserContext";
import UserProfile from "../../../assets/user-avatar.svg";

import { postTweet } from "../../../utils/api";
import ReplyTweetComponent from "./ReplyTweetComponent";

const PostTweetModal = ({}) => {
  const [isThread, setIsThread] = useState(false);
  const [charCount, setcharCount] = useState(0);
  const navigate = useNavigate();
  // const { tweet, postTweet } = useTweet();
  // const [tweets, settweet] = useState(" ");
  // const { users } = useUser();
  // const handleChange = (e) => {
  //   let count = e.target.value;
  //   setcharCount(count.length);
  //   let tweet = e.target.value;
  //   settweet(tweet);
  //   console.log(tweet);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tweets) return;
    const payload = {
      content: tweets,
      userId: users.id,
    };
    console.log(payload);
    // postTweet(payload);
    settweet("");
    navigate(-1);
  };

  const handleclose = () => {
    console.log("CLiked");
  };

  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 w-screen h-screen bg-twitterBluedefault/50"></div>
      <div className="absolute w-7/12 transform -translate-x-1/2 bg-black -translate-y-1/4 top-1/4 left-1/2 rounded-2xl">
        <div className="inline-flex flex-col items-start justify-end flex-grow w-full text-2xl font-bold bg-black text-stone-50 rounded-2xl">
          {/* Routing Error Handinling */}

          <header className="flex justify-between px-4 py-3 ">
            <Link to="/" className="inline-flex items-center">
              <img src={Closebtn} alt="cancel-icon" className="w-6 h-6" />
            </Link>
          </header>
          <form
            onSubmit={handleSubmit}
            className="inline-block w-full overflow-y-hidden bg-black scroll-m-0 rounded-ee-2xl rounded-b-2xl"
          >
            <div className="flex-grow relative items-start w-full flex-col min-h-[9rem] overflow-auto  max-h-80 ">
              {/* <section className="relative flex flex-row items-start justify-center w-full h-full gap-3 px-4 py-2 ">
                <div className="absolute -left-[2px] z-10 inline-flex min-h-[40%] h-full translate-x-8 border-2 border-gray-500/50"></div>
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
                    onChange={handleChange}
                  />
                </div>
              </section> */}
              {/* <ReplyTweetComponent /> */}
              <ReplyTweetComponent />
              <ReplyTweetComponent />
              <ReplyTweetComponent />
            </div>
            <section className="bottom-0 w-full px-4 py-2 text-base font-normal border-t-2 border-t-neutral800">
              <div className="flex justify-between">
                <p className="text-neutral-600" id="characteCheck">
                  {`${charCount}/280`}
                </p>
                <div className="flex gap-3 px-2 border-l border-gray-500">
                  <button
                    className="inline-flex items-center justify-center w-8 h-8 text-lg border rounded-full text-twitterBluedefault"
                    onClick={() => setIsThread(true)}
                  >
                    +
                  </button>
                  <Button buttonsize="sm" varient="bluebtn" type="submit">
                    Post
                  </Button>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostTweetModal;
