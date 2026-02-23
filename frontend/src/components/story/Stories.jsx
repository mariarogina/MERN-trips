import React, { useState, useEffect, useContext } from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import storiesService from "../../services/storiesService";
import UserContext from "../../contexts/userContext";

//all stories at /stories
const Stories = ({ editStoryId, setEditStoryId }) => {
  const userContext = useContext(UserContext);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    storiesService.getAllStories().then((response) => {
      console.log("promise fulfilled");
      console.log(response.data);
      setStories(response.data);
    });
  }, []);

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
  console.log(stories);

  return (
    <div className="storiesWrapper">
      <h3> All Stories</h3>
      {/* {UserContext.isLoggedIn? */}
      {userContext.isLoggedIn ? (
        <div>
          <Link className="btnLink" to="/mystories">
            <button className="simpleBtn btn btn-success">
              Manage my stories
            </button>
          </Link>
        </div>
      ) : (
        <></>
      )}
      {userContext.isLoggedIn ? (
        <div>
          <Link className="btnLink" to="/addstory">
            <button className="simpleBtn btn btn-primary"> Add a story </button>
          </Link>
        </div>
      ) : (
        <></>
      )}
      {/* {stories.map((i) => {
        return <Story data={i} key={i._id} />;
      })} */}

      <div className="storiesWrapper">
        <table border="0" style={{ width: "90%", margin: "auto" }}>
          <tbody>
            <tr className="tableRow">
              <th className="tableHead">Pvm</th>
              <th className="tableHead">Kohde</th>
              <th className="tableHead">Tarina</th>
              <th className="tableHead">Kertoja</th>
              <th className="tableHead">Kuva</th>
            </tr>
            {stories.map((story) => {
              return (
                <tr className="tableRow" key={story._id}>
                  <td className="tableCell">{formatDate(story.pvm)}</td>
                  <td className="tableCell">
                    <Link
                      to={{
                        pathname: `/singlestory/${story._id}`,
                        state: { data: story },
                      }}
                    >
                      {story.kohde}
                    </Link>
                  </td>
                  <td className="tableCell">{story.tarina}</td>
                  <td className="tableCell">{story.tekijänNimi}</td>
                  <td className="tableCell">
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={story.kuva}
                      alt=""
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stories;
