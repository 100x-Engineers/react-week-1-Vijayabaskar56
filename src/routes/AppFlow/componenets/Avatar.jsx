import { PropTypes } from "prop-types";

const Avatar = ({ Avatar }) => {
  return (
    <>
      <img className="relative w-12 h-12 rounded-full" src={Avatar} />
    </>
  );
};

export default Avatar;

Avatar.propTypes = {
  Avatar: PropTypes.string,
};
