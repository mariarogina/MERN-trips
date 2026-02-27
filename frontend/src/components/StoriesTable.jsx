import React from "react";
import { useState, useEffect, useContext } from "react";
import "../index.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const StoriesTable = () => {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = () => {
    axios.get("http://localhost:5000/api/stories").then((response) => {
      console.log(response.data);
      setStories(response.data);
    });
  };

  return (
    <div className="storiesWrapper">
      <table border="1" style={{ width: "90%", margin: "auto" }}>
        <tbody>
          <tr className="tableRow">
            <th className="tableHead">Date</th>
            <th className="tableHead">Place</th>
            <th className="tableHead">Story</th>
            <th className="tableHead">User</th>
            <th className="tableHead">Pic</th>
          </tr>
          {stories.map((story) => {
            return (
              <tr className="tableRow" key={uuidv4()}>
                <td className="tableCell">{new Date(story.pvm).toString()}</td>
                <td className="tableCell">{story.kohde}</td>
                <td className="tableCell">{story.tarina}</td>
                <td className="tableCell">{story.tekijänNimi}</td>
                <td className="tableCell">
                  <img style={{ width: "150px" }} src={story.kuva} alt="" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StoriesTable;
