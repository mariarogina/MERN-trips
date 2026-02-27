import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import storiesService from "../../services/storiesService";
import usersService from "../../services/usersService";

// Add new story
const StoryForm = () => {
  const userContext = useContext(UserContext);
  const history = useHistory();
  const authorNameKey = "tekij\u00E4nNimi";
  const authorIdKey = "tekij\u00E4nId";

  const [userName, setUserName] = useState("");
  const [story, setStory] = useState({
    paikkakunta: "",
    pvm: "",
    kohde: "",
    tarina: "",
    kuva: "",
    [authorNameKey]: "",
    [authorIdKey]: "",
  });

  useEffect(() => {
    if (!userContext.email) {
      return;
    }

    (async () => {
      const res = await usersService.getUserByMail(userContext.email);
      const fetchedUser = res.data.user[0];

      if (!fetchedUser) {
        return;
      }

      setUserName(fetchedUser.nimi);
      setStory((prev) => ({
        ...prev,
        [authorNameKey]: fetchedUser.nimi,
        [authorIdKey]: fetchedUser._id,
      }));
    })();
  }, [authorIdKey, authorNameKey, userContext.email]);

  const handlePlace = (e) => {
    setStory({ ...story, paikkakunta: e.target.value });
  };

  const handleDate = (e) => {
    setStory({ ...story, pvm: e.target.value });
  };

  const handleDestination = (e) => {
    setStory({ ...story, kohde: e.target.value });
  };

  const handleStory = (e) => {
    setStory({ ...story, tarina: e.target.value });
  };

  const handlePic = (e) => {
    setStory({ ...story, kuva: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await storiesService.createStory(story, userContext.token);
      alert("Sucessfully added story");
      history.push("/stories");
    } catch (err) {
      return err;
    }
  };

  return (
    <div className="loginWrapper">
      <div>{userName}</div>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Create a story</h3>
            <div className="form-group mt-3">
              <h3>Authors name</h3>
              <p>{userName}</p>
            </div>
            <div className="form-group mt-3">
              <label>Place</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Helsinki"
                value={story.paikkakunta}
                onChange={handlePlace}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Date</label>
              <input
                type="date"
                className="form-control mt-1"
                placeholder="e.g 2022-02-02"
                value={story.pvm}
                onChange={handleDate}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Destination</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g. Nuuksio"
                value={story.kohde}
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
                value={story.tarina}
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
                value={story.kuva}
                onChange={handlePic}
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoryForm;
