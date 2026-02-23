import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import storiesService from "../../services/storiesService";

// Update existing story
const StoryEditForm = ({ editStoryId }) => {
  const [story, setStory] = useState({});
  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchStory = async () => {
      const res = await storiesService.getStoryById(editStoryId);
      setStory(res.data.story);
    };

    if (editStoryId) {
      fetchStory();
    }
  }, [editStoryId]);

  const handlePlace = (e) => {
    e.preventDefault();
    setStory({ ...story, paikkakunta: e.target.value });
  };

  const handleDate = (e) => {
    e.preventDefault();
    setStory({ ...story, pvm: e.target.value });
  };

  const handleDestination = (e) => {
    e.preventDefault();
    setStory({ ...story, kohde: e.target.value });
  };

  const handleStory = (e) => {
    e.preventDefault();
    setStory({ ...story, tarina: e.target.value });
  };

  const handlePic = (e) => {
    e.preventDefault();
    setStory({ ...story, kuva: e.target.value });
  };

  const handleSubmit = () => {
    try {
      storiesService.updateStory(
        story._id,
        {
          paikkakunta: story.paikkakunta,
          pvm: story.pvm,
          kohde: story.kohde,
          tarina: story.tarina,
          kuva: story.kuva,
        },
        userContext.token
      );
      alert("Sucessfully updated story");
    } catch (err) {
      return err;
    }
  };

  const authorNameKey = Object.keys(story).find(
    (key) => key.includes("tekij") && key.includes("Nimi")
  );
  const authorName = authorNameKey ? story[authorNameKey] : "";

  return (
    <div className="loginWrapper">
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Edit a story</h3>
            <div className="form-group mt-3">
              <label>Author's name</label>
              <p>{authorName}</p>
            </div>

            <div className="form-group mt-3">
              <label>Date</label>
              <input
                type="date"
                className="form-control mt-1"
                placeholder="e.g 2022-02-02"
                value={story.pvm || ""}
                onChange={handleDate}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Place</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Helsinki"
                value={story.paikkakunta || ""}
                onChange={handlePlace}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Destination</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g. Nuuksio"
                value={story.kohde || ""}
                onChange={handleDestination}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Story</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Your story"
                value={story.tarina || ""}
                onChange={handleStory}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Picture link</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="https://..."
                value={story.kuva || ""}
                onChange={handlePic}
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <Link className="btnLink" to="/mystories">
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoryEditForm;
