import React, { useEffect } from "react";
import { useState, useContext } from "react";
import storiesService from "../../services/storiesService";
import usersService from "../../services/usersService";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";

//add new story
const StoryForm = () => {
  const userContext = useContext(UserContext);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [story, setStory] = useState({
    tekijänNimi: "Mila",
    paikkakunta: "",
    pvm: "",
    kohde: "",
    tarina: "",
    kuva: "",
    tekijänId: "",
  });

  useEffect(() => {
    const fetchUserId = async (userEmailToFetch) => {
      const res = await usersService.getUserByMail(userEmailToFetch);
      return res.data.user[0]._id;
    };
    const fetchUserName = async (userEmailToFetch) => {
      const res = await usersService.getUserByMail(userEmailToFetch);
      return res.data.user[0].nimi;
    };
    (async () => {
      const fetchedUserId = await fetchUserId(userContext.email);
      const fetchedUserName = await fetchUserName(userContext.email);
      setUserName(fetchedUserName);
      setUserId(fetchedUserId);
      setStory({
        ...story,
        tekijänNimi: fetchedUserName,
        tekijänId: fetchedUserId,
      });
      // setStory({ ...story, tekijänId: fetchedUserId });
    })();
  }, []);

  console.log(typeof userName, userName);
  console.log(typeof userId, userId);
  const handleName = (e) => {
    e.preventDefault();
    setStory({ ...story, tekijänNimi: e.target.value });
  };

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

  const handleSubmit = (e) => {
    try {
      storiesService.createStory(story, userContext.token);
      alert("Sucessfully added story");
    } catch (err) {
      return err;
    }
  };
  return (
    <div className="loginWrapper">
      <div>{userName}</div>
      <div className="Auth-form-container">
        <form className="Auth-form">
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
                onChange={(e) => {
                  handlePlace(e);
                }}
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
                onChange={(e) => {
                  handleDate(e);
                }}
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
                onChange={(e) => {
                  handleDestination(e);
                }}
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
                onChange={(e) => {
                  handleStory(e);
                }}
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
                onChange={(e) => {
                  handlePic(e);
                }}
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <Link className="btnLink" to="/stories">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              </Link>
            </div>
            {/* <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoryForm;
