import React from "react";

const Story = ({ data }) => {
  return (
    <div className="storyWrap">
      Story
      <p>
        Created by:<b> {data.title}</b>
      </p>
      <p>
        About: <b>{data.description}</b>
      </p>
      <p>
        Date: <b>{data.date.toString()}</b>
      </p>
      <button className="btn btn-secondary">Edit story</button>
    </div>
  );
};

export default Story;
