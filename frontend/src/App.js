import React from "react";
import { useCallback, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Users from "./components/user/Users";
import Stories from "./components/story/Stories";
import Nav from "./components/Nav";
import "./index.css";
import AddStory from "./components/story/AddStory";
import EditStory from "./components/story/EditStory";
import MyStories from "./components/story/MyStories";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./contexts/userContext";
import UsersStories from "./components/user/UsersStories";
import SingleStory from "./components/story/SingleStory";

export const App = () => {
  const [token, setToken] = useState(false);
  const [email, setEmail] = useState("");
  const [editStoryId, setEditStoryId] = useState("");

  const login = useCallback((token, sähköpostiosoite) => {
    setToken(token);
    setEmail(sähköpostiosoite);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        email: email,
      }}
    >
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/users" component={Users} />
            <Route path="/login" component={Login} />
            <Route
              path="/stories"
              render={() => (
                <Stories
                  editStoryId={editStoryId}
                  setEditStoryId={setEditStoryId}
                />
              )}
            />
            <Route
              path="/singlestory/:id"
              render={() => (
                <SingleStory
                  editStoryId={editStoryId}
                  setEditStoryId={setEditStoryId}
                />
              )}
            />
            <Route path="/addstory" component={AddStory} />
            <Route
              path="/editstory"
              render={() => (
                <EditStory
                  editStoryId={editStoryId}
                  setEditStoryId={setEditStoryId}
                />
              )}
            />
            <Route
              path="/mystories"
              render={() => (
                <MyStories
                  editStoryId={editStoryId}
                  setEditStoryId={setEditStoryId}
                />
              )}
            />
            <Route path="/usersstories/:mail?" component={UsersStories} />
            <Route component={Home} />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
