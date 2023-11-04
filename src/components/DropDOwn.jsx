import { Field } from "formik";
import PropTypes from "prop-types";

const DropDOwn = ({ name, ...rest }) => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = [];

  for (let i = 1; i <= 31; i++) {
    day.push(i);
  }

  const year = [];
  const date = new Date();
  for (let i = 1990; i < date.getFullYear(); i++) {
    year.push(i);
  }
  const varient = {
    day: day,
    month: month,
    year: year,
  };

  const options = varient[name];

  return (
    <>
      {/* Month */}
      <fieldset className="group w-6/12 pt-2 pb-4 px-3 border border-neutral500 rounded-[4px] flex items-center focus-within:outline-none focus-within:border-twitterBlue focus-within:ring-twitterBlue">
        <legend className="px-1 text-xs font-medium leading-normal text-neutral500 group-focus-within:text-twitterBlue">
          {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
        </legend>
        <Field
          component="select"
          name={`${name}`}
          className="w-full bg-transparent text-neutral-50 focus:outline-none"
          // value={value}
          {...rest}
        >
          <option value selected disabled />
          <option value="">
            {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
          </option>
          {options.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </Field>
      </fieldset>
    </>
  );
};

export default DropDOwn;

DropDOwn.propTypes = {
  name: PropTypes.string,
};
