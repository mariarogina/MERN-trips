import React from "react";
import "../../index.css";
import Story from "./Story copy";
import { Link } from "react-router-dom";

const info = [
  { id: 1, title: "A", description: "Nice", date: new Date() },
  { id: 2, title: "B", description: "Good", date: new Date() },
  { id: 3, title: "C", description: "Fine", date: new Date() },
];

const Stories111 = () => {
  return (
    <div className="storiesWrapper">
      <div>
        <Link className="btnLink" to="/addstory">
          <button className="simpleBtn btn btn-primary"> Add a story </button>
        </Link>
      </div>
      {info.map((i) => {
        return <Story data={i} />;
      })}
    </div>
  );
};

export default Stories111;
