import { createContext } from "react";

const UserContext = createContext({
  isLoggedIn: false,
  // _id: null,
  email: "",
  token: null,
  // setEmail: () => {},
  login: () => {},
  logout: () => {},
});

export default UserContext;
