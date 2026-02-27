import React from "react";
import "../index.css";

// user posting at /home
const Card = ({ data }) => {
  const authorNameKey = Object.keys(data).find(
    (key) => key.includes("tekij") && key.includes("Nimi")
  );
  const authorName = authorNameKey ? data[authorNameKey] : "";

  return (
    <div className="cardWrap">
      <h4 className="cardTitle">Story</h4>
      <p>
        User:<b> {authorName}</b>
      </p>
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
