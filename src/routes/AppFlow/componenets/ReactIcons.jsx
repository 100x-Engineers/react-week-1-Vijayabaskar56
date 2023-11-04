import React, { useState } from "react";

function ReactIcons({ activImg, inactiveImg, value }) {
  const [isActive, setISActive] = useState(false);
  return (
    <>
      <div className="flex">
        <img
          src={isActive ? inactiveImg : activImg}
          alt="icon"
          onClick={() => setISActive(!isActive)}
        />
        <p className="px-1 text-neutral500">{value}</p>
      </div>
    </>
  );
}

export default ReactIcons;
