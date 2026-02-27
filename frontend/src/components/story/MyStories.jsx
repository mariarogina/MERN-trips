import React, { useState, useEffect, useContext } from "react";
import "../../index.css";
import MyStory from "./MyStory";
import { Link } from "react-router-dom";
import storiesService from "../../services/storiesService";
import usersService from "../../services/usersService";
import UserContext from "../../contexts/userContext";

//component to manage user stories
const MyStories = ({ editStoryId, setEditStoryId }) => {
  const [stories, setStories] = useState([]);
  const [userName, setUserName] = useState("");
  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async (userEmailToFetch) => {
      const res = await usersService.getUserByMail(userEmailToFetch);
      console.log(res.data.user[0].nimi + "NIMI");
      return res.data.user[0].nimi;
    };

    const fetchStoriesForUsername = async (userNameToFetch) => {
      const res = await storiesService.getStoriesByUserName(
        userNameToFetch,
        userContext.token
      );
      const fetchedStories = res.data;
      return fetchedStories;
    };

    (async () => {
      const fetchedUserName = await fetchUser(userContext.email);
      const fetchedStories = await fetchStoriesForUsername(fetchedUserName);
      setStories(fetchedStories);
      setUserName(fetchedUserName);
    })();
  }, []);

  return (
    <div className="storiesWrapper">
      <h3> My Stories</h3>
      <h2>{userName}</h2>
      <div>
        <Link className="btnLink" to="/addstory">
          <button className="simpleBtn btn btn-primary"> Add a story </button>
        </Link>
      </div>
      {userContext.isLoggedIn ? (
        <div>
          <Link className="btnLink" to="/stories">
            <button className="simpleBtn btn btn-info">
              Back to all stories
            </button>
          </Link>
        </div>
      ) : (
        <></>
      )}
      {stories.map((i) => {
        return (
          <MyStory
            data={i}
            editStoryId={editStoryId}
            setEditStoryId={setEditStoryId}
            key={i._id}
          />
        );
      })}
    </div>
  );
};

export default MyStories;
