import PropTypes from "prop-types";

const InputField = ({ name, type, errors, touched, ...rest }) => {
  // const hidden = "hidden";
  const base =
    "w-full bg-transparent text-neutral-50 placeholder:text-neutral-500 focus:outline-none";
  const numStyle =
    type == "number"
      ? "[appearance:textfield] focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      : "";
  const className = `${base}${numStyle}`;
  return (
    <>
      <div className="flex-col">
        <fieldset className="flex items-center self-stretch px-3 py-4 pt-2 border border-solid rounded group border-neutral-500 focus-within:border-blue-400">
          <legend className="text-xs not-italic font-medium leading-normal text-neutral-500 group-focus-within:text-blue-400">
            {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
          </legend>
          <input id={name} name={name} className={className} {...rest} />
        </fieldset>
        {errors && touched && <div className="text-red-600">{errors}</div>}
      </div>
    </>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  errors: PropTypes.string,
  touched: PropTypes.bool,
};

export default InputField;
