import React from "react";
import UserContext from "../../contexts/userContext";
import { useState, useContext, useEffect } from "react";
import Story from "../story/Story";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import storiesService from "../../services/storiesService";
import usersService from "../../services/usersService";

//single user's stories
const UsersStories = () => {
  const [stories, setStories] = useState([]);
  const [userName, setUserName] = useState("");
  const userContext = useContext(UserContext);
  const location = useLocation();
  const { mail } = location.state;

  useEffect(() => {
    const fetchUser = async (userEmailToFetch) => {
      const res = await usersService.getUserByMail(userEmailToFetch);
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
      const fetchedUserName = await fetchUser(mail);
      const fetchedStories = await fetchStoriesForUsername(fetchedUserName);
      setStories(fetchedStories);
      setUserName(fetchedUserName);
    })();
  }, []);

  console.log(stories);

  return (
    <div className="storiesWrapper">
      <h3> {userName}'s Stories</h3>
      {userContext.isLoggedIn ? (
        <div>
          <Link className="btnLink" to="/users">
            <button className="simpleBtn btn btn-info">
              Back to all users
            </button>
          </Link>
        </div>
      ) : (
        <></>
      )}
      {/* <div>
        <Link className="btnLink" to="/addstory">
          <button className="simpleBtn btn btn-primary"> Add a story </button>
        </Link>
      </div> */}
      {stories.map((i) => {
        return <Story data={i} />;
      })}
    </div>
  );
};

export default UsersStories;
