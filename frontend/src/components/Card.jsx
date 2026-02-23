import React from "react";
import "../index.css";

// user posting at /home
const Card = ({ data }) => {
  return (
    <div className="cardWrap">
      Story
      <p>
        Destination:<b> {data.kohde}</b>
      </p>
      <p>
        Impression:<b> {data.tarina}</b>
      </p>
    </div>
  );
};

export default Card;
