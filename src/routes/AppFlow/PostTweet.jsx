import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../components/Image";
import UserProfile from "../../assets/user-avatar.svg";
import { useState, useRef } from "react";
import Closebtn from "../../assets/cancel.svg";
import TextareaAutosize from "react-textarea-autosize";
import { useTweet } from "../context";

const PostTweet = () => {
  const { users, setTweets } = useTweet();
  const [charCount, setcharCount] = useState(0);
  const ref = useRef();
  const navigate = useNavigate();
  const { tweet, postTweet } = useTweet();
  const [tweets, settweet] = useState(" ");

  const handleChange = (e) => {
    let count = e.target.value;
    settweet(tweets);
    console.log(tweets);
    setcharCount(count.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tweets) return;
    const payload = {
      content: tweets,
      userId: users.id,
    };

    const res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log(res);
    setTweets(tweets);
    settweet("");
    navigate(-1);
  };

  return (
    <>
      <div className="h-screen ">
        <form onSubmit={handleSubmit} className="bg-black">
          <header className="flex justify-between px-4 py-3 ">
            <Link to="/" className="inline-flex items-center">
              <img src={Closebtn} alt="cancel-icon" />
            </Link>
            <Button varient="bluebtn" type="submit">
              Post
            </Button>
          </header>
          <div className="flex items-center">
            <section className="relative inline-flex flex-row items-center justify-center gap-3 px-4 py-2">
              <div className="flex h-aut0 h-10 min-h-fit max-h-[10rem]">
                <Image
                  src={UserProfile}
                  alt="user-avatar"
                  className="relative top-0 h-fit mg-auto "
                  ref={ref}
                />
              </div>
              <div className="">
                <TextareaAutosize
                  name="tweerInput"
                  id="tweerInput"
                  cols="40"
                  style={{
                    resize: "vertical",
                  }}
                  className={`bg-black resize-y focus:outline-none caret-twitterBlue w-full placeholder:text-neutral600 ${
                    charCount < 280 ? "text-neutral-50" : "text-red-700"
                  }`}
                  placeholder="What's happening?!"
                  cacheMeasurements
                  value={tweet}
                  onChange={handleChange}
                />
              </div>
            </section>
          </div>
        </form>
        <section className="absolute bottom-0 w-full px-4 py-2 border-t-2 border-t-neutral800">
          <p className="text-neutral-600" id="characteCheck">
            {`${charCount}/280`}
          </p>
        </section>
      </div>
    </>
  );
};

export default PostTweet;
