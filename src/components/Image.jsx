import PropTypes from "prop-types";

const Image = ({ size, ...rest }) => {
  const styleClass = `${size}`;

  return (
    <>
      <img className={styleClass} {...rest} />
    </>
  );
};

Image.propTypes = {
  size: PropTypes.string,
};

export default Image;
