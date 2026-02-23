import React from "react";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/userContext";
import usersService from "../../services/usersService";
import storiesService from "../../services/storiesService";

//have a look at a single story from /stories
const SingleStory = ({ editStoryId, setEditStoryId }) => {
  const userContext = useContext(UserContext);
  const [userId, setUserId] = useState("");
  const location = useLocation();
  const { data } = location.state;

  useEffect(() => {
    const fetchUser = async (userEmailToFetch) => {
      const res = await usersService.getUserByMail(userEmailToFetch);
      return res.data.user[0]._id;
    };

    (async () => {
      const fetchedUserId = await fetchUser(userContext.email);

      setUserId(fetchedUserId);
    })();

    // console.log(userId + "USERID");
  }, []);

  const handleSetEditId = () => {
    setEditStoryId(data._id);
  };
  const history = useHistory();
  const handleRemoveStory = (id) => {
    try {
      storiesService.removeStory(id, userContext.token);
      alert("Story deleted from db");
      history.replace("/stories");
    } catch (err) {
      return err;
    }
  };

  const deleteStory = () => {
    if (window.confirm("Are you sure to delete this?")) {
      handleRemoveStory(data._id);
    } else {
      alert("Deletion cancelled");
    }
  };

  return (
    <div className="storyWrap">
      <div>
        <h3>Story</h3>
      </div>

      {userId === data.tekijänId && (
        <div>
          <Link className="btnLink" to="/addstory">
            <button className="simpleBtn btn btn-success">+</button>
          </Link>
          <Link className="btnLink" to="/editstory">
            <button
              className="simpleBtn btn btn-secondary"
              onClick={() => {
                handleSetEditId();
              }}
            >
              Edit story
            </button>
          </Link>
          <button className="simpleBtn btn btn-warning" onClick={deleteStory}>
            Delete story
          </button>
        </div>
      )}

      {userContext.isLoggedIn ? (
        <div>
          <Link className="btnLink" to="/stories">
            <button className="simpleBtn btn btn-info">Back</button>
          </Link>
        </div>
      ) : (
        <></>
      )}

      <p>
        Author:<b> {data.tekijänNimi}</b>
      </p>
      <p>
        From:<b> {data.paikkakunta}</b>
      </p>
      <p>
        Travel to:<b> {data.kohde}</b>
      </p>
      <p>
        Date : <b>{new Date(data.pvm).toString()}</b>
      </p>
      <p>
        Story: <b>{data.tarina}</b>
      </p>
      <p>
        Photo:
        <img alt="story photo" src={data.kuva} style={{ width: "200px" }}></img>
      </p>
    </div>
  );
};

export default SingleStory;
