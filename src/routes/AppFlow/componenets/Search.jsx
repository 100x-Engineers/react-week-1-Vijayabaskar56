import searchicon from "../../../assets/search.svg";
import PropTypes from "prop-types";

const Search = ({ searchtext }) => {
  return (
    <div className="flex flex-row items-center justify-start flex-shrink-0 h-10 w-w01 rounded-3xl bg-searchbarFill focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
      <img
        src={searchicon}
        alt="search-icon"
        srcSet
        className="inline w-5 h-5 mx-2"
      />
      <input
        type="search"
        name="search"
        id="search"
        value={searchtext}
        placeholder="Search"
        className="mx-2 bg-searchbarFill focus:outline-none caret-twitterBlue text-neutral-50 placeholder:text-neutral-600"
      />
    </div>
  );
};

Search.propTypes = {
  searchtext: PropTypes.string,
};

export default Search;
