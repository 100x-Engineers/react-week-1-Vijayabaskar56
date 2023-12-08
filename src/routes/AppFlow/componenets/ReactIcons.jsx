import { useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useDataContext } from "../../context/useFetchDataContext";
import { appUrl } from "../../../utils/urls";

function ReactIcons({ activImg, inactiveImg, value }) {
  const [isActive, setISActive] = useState(false);
  const { users } = useDataContext();
  const likeCountRef = useRef(value);
  const likeCount = useMemo(() => {
    return likeCountRef.current;
  }, [likeCountRef]);
  const clickhandler = async () => {
    likeCountRef.current = likeCountRef.current + 1;
    if (likeCount.current % 10 === 0 || null) {
      const response = await axios.post(`${appUrl}/posts/${users.id}/reposts`);
      if (response >= 200 && response < 300) {
        console.log(response);
      }
    }
    setISActive(!isActive);
  };
  return (
    <>
      <div className="flex">
        <img
          src={isActive ? inactiveImg : activImg}
          alt="icon"
          onClick={() => clickhandler()}
        />
        <p className="px-1 text-neutral500">{value}</p>
      </div>
    </>
  );
}

export default ReactIcons;

ReactIcons.propTypes = {
  activImg: PropTypes.string,
  inactiveImg: PropTypes.string,
  value: PropTypes.string,
};
