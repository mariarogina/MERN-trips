import React from "react";
import { Link } from "react-router-dom";
import storiesService from "../../services/storiesService";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/userContext";

//component to manage user stories
const MyStory = ({ data, editStoryId, setEditStoryId }) => {
  console.log(data._id);
  const userContext = useContext(UserContext);

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

  const handleSetEditId = () => {
    console.log(data._id);
    setEditStoryId(data._id);
    console.log(editStoryId);
  };
  return (
    <div className="storyWrap">
      Story
      <p>
        Destination:<b> {data.kohde}</b>
      </p>
      <p>
        date : <b>{new Date(data.pvm).toString()}</b>
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
      <button onClick={deleteStory} className="simpleBtn btn btn-warning">
        Delete story
      </button>
    </div>
  );
};

export default MyStory;
