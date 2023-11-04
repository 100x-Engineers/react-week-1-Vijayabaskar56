import PropTypes from "prop-types";

const Input = ({ label, type, isdisable, setInputValue, inputValue }) => {
  return (
    <>
      <div className="relative">
        <div className="flex border-2 border-solid rounded-md appearance-none border-neutral500 group focus-within:border-blue-500">
          <input
            type={type}
            id={label}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="block px-3 pb-2.5 pt-4 w-full text-sm outline-none text-gray-900 bg-black rounded-md dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer/email"
            placeholder=" "
            disabled={isdisable}
          />
          <label
            htmlFor={label}
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black px-2 peer-focus/email:px-2 peer-focus/email:text-blue-600 peer-focus/email:dark:text-blue-500 peer-placeholder-shown/email:scale-100 peer-placeholder-shown/email:-translate-y-1/2 peer-placeholder-shown/email:top-1/2 peer-focus/email:top-2 peer-focus/email:scale-75 peer-focus/email:-translate-y-4 left-1"
          >
            {inputValue}
          </label>
          <img
            src="../../public/images/tick-circle.svg"
            alt="success"
            className="px-2"
          />
        </div>
      </div>
    </>
  );
};

export default Input;

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  isdisable: PropTypes.bool,
  setInputValue: PropTypes.func,
  inputValue: PropTypes.string,
};
