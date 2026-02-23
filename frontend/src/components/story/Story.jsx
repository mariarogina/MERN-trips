import React from "react";

//single story card
const Story = ({ data }) => {
  const formatDate = (date) => {
    let newDate = new Date(date);
    let formattedDate =
      newDate.getDate() +
      "." +
      (newDate.getMonth() + 1) +
      "." +
      newDate.getFullYear();
    return formattedDate;
  };
  return (
    <div className="storyWrap">
      Story
      <p>
        Destination:<b> {data.kohde}</b>
      </p>
      <p>
        date : <b>{formatDate(data.pvm)}</b>
      </p>
      <p>
        story: <b>{data.tarina}</b>
      </p>
      <p>
        by: <b>{data.tekijänNimi}</b>
      </p>
      <div>
        <img
          style={{ width: "100px", height: "100px" }}
          src={data.kuva}
          alt=""
        />
      </div>
    </div>
  );
};

export default Story;
