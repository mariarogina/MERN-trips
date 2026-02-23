import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import Story from "../story/Story";
import storiesService from "../../services/storiesService";
import usersService from "../../services/usersService";

// Single user's stories
const UsersStories = () => {
  const [stories, setStories] = useState([]);
  const [userName, setUserName] = useState("");
  const userContext = useContext(UserContext);
  const location = useLocation();
  const { mail: mailParam } = useParams();

  const mailFromState = location.state?.mail || "";
  const mailFromParam = mailParam ? decodeURIComponent(mailParam) : "";
  const selectedMail = mailFromState || mailFromParam;

  useEffect(() => {
    if (!selectedMail) {
      return;
    }

    const fetchUser = async (userEmailToFetch) => {
      const res = await usersService.getUserByMail(userEmailToFetch);
      return res.data.user[0].nimi;
    };

    const fetchStoriesForUsername = async (userNameToFetch) => {
      const res = await storiesService.getStoriesByUserName(
        userNameToFetch,
        userContext.token
      );
      return res.data;
    };

    (async () => {
      const fetchedUserName = await fetchUser(selectedMail);
      const fetchedStories = await fetchStoriesForUsername(fetchedUserName);
      setStories(fetchedStories);
      setUserName(fetchedUserName);
    })();
  }, [selectedMail, userContext.token]);

  if (!selectedMail) {
    return (
      <div className="storiesWrapper">
        <h3>No user selected</h3>
        <Link className="btnLink" to="/users">
          <button className="simpleBtn btn btn-info">Back to all users</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="storiesWrapper">
      <h3>{userName}'s Stories</h3>
      <div>
        <Link className="btnLink" to="/users">
          <button className="simpleBtn btn btn-info">Back to all users</button>
        </Link>
      </div>
      {stories.map((i) => {
        return <Story data={i} key={i._id} />;
      })}
    </div>
  );
};

export default UsersStories;
