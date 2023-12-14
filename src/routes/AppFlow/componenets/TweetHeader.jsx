import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TweetHeader = ({
  name = "VJ",
  userId = "@Vj",
  time = "3hrs",
  tweet = "Life is what you make it",
}) => {
  return (
    <>
      <div className="inline-flex items-center self-stretch justify-start gap-px w-fit">
        <p className="text-base font-medium">
          <Link to={userId} className="hover:underline">
            {name}
          </Link>
          <span className="inline text-base font-normal text-neutral500 w-fit">
            {`@${userId} • ${time}`}
          </span>
        </p>
      </div>
      <div className="">
        <p
          className="h-full overflow-auto w-fit"
          style={{ overflowWrap: "anywhere" }}
        >
          {tweet}
        </p>
      </div>
    </>
  );
};

export default TweetHeader;

TweetHeader.propTypes = {
  name: PropTypes.string,
  userId: PropTypes.string,
  time: PropTypes.string,
  tweet: PropTypes.string,
};
