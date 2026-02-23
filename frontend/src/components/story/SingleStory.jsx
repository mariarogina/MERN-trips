import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import usersService from "../../services/usersService";
import storiesService from "../../services/storiesService";

// Have a look at a single story from /stories
const SingleStory = ({ setEditStoryId }) => {
  const userContext = useContext(UserContext);
  const [userId, setUserId] = useState("");
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const [story, setStory] = useState(location.state?.data || null);

  useEffect(() => {
    if (!userContext.email) {
      return;
    }

    const fetchUser = async (userEmailToFetch) => {
      const res = await usersService.getUserByMail(userEmailToFetch);
      return res.data.user[0]._id;
    };

    (async () => {
      const fetchedUserId = await fetchUser(userContext.email);
      setUserId(fetchedUserId);
    })();
  }, [userContext.email]);

  useEffect(() => {
    if (story || !id) {
      return;
    }

    const fetchStory = async () => {
      const res = await storiesService.getStoryById(id);
      setStory(res.data.story);
    };

    fetchStory();
  }, [id, story]);

  const handleSetEditId = () => {
    if (story) {
      setEditStoryId(story._id);
    }
  };

  const handleRemoveStory = async (storyId) => {
    try {
      await storiesService.removeStory(storyId, userContext.token);
      alert("Story deleted from db");
      history.replace("/stories");
    } catch (err) {
      return err;
    }
  };

  const deleteStory = () => {
    if (!story) {
      return;
    }

    if (window.confirm("Are you sure to delete this?")) {
      handleRemoveStory(story._id);
    } else {
      alert("Deletion cancelled");
    }
  };

  if (!story) {
    return <div className="storyWrap">Loading story...</div>;
  }

  const authorIdKey = Object.keys(story).find(
    (key) => key.includes("tekij") && key.includes("Id")
  );
  const authorNameKey = Object.keys(story).find(
    (key) => key.includes("tekij") && key.includes("Nimi")
  );
  const authorId = authorIdKey ? story[authorIdKey] : "";
  const authorName = authorNameKey ? story[authorNameKey] : "";

  return (
    <div className="storyWrap">
      <div>
        <h3>Story</h3>
      </div>

      {userId === authorId && (
        <div>
          <Link className="btnLink" to="/addstory">
            <button className="simpleBtn btn btn-success">+</button>
          </Link>
          <Link className="btnLink" to="/editstory">
            <button className="simpleBtn btn btn-secondary" onClick={handleSetEditId}>
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
        Author:<b> {authorName}</b>
      </p>
      <p>
        From:<b> {story.paikkakunta}</b>
      </p>
      <p>
        Travel to:<b> {story.kohde}</b>
      </p>
      <p>
        Date : <b>{new Date(story.pvm).toString()}</b>
      </p>
      <p>
        Story: <b>{story.tarina}</b>
      </p>
      <p>
        Photo:
        <img alt="Story" src={story.kuva} style={{ width: "200px" }} />
      </p>
    </div>
  );
};

export default SingleStory;
