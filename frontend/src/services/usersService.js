import axios from "axios";
const baseUrl = "http://localhost:5000/api/users";

//get
const getAllUsers = () => {
  return axios.get(baseUrl);
};

const getUserById = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};

//add
const createUser = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const loginUser = async (
  newObject,
  // setError,
  login
  // setEmail
) => {
  await axios
    .post(`${baseUrl}/login`, newObject)
    .then((response) => {
      console.log(response.data);
      console.log(response.data.sähköpostiosoite + "RESPONSE sähköpostiosoite");
      login(
        response.data.token,
        // response._id,
        response.data.sähköpostiosoite
      );
      // setEmail(newObject.sähköpostiosoite);
      return response;
    })
    .catch((error) => {
      alert("Login error");
      if (error.response) {
        // let customError = error.response;
        // customError.userMessage = "Käyttajää ei ole olemassa";
        // setError(customError);
        return error;
      }
    });
};

const signupUser = async (
  newObject
  // setError
) => {
  await axios
    .post(baseUrl, newObject)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        // let customError = error.response;
        // customError.userMessage = "Rekisteroityminen epäonnistui.";
        // setError(customError);
        return error;
      }
    });
};

//edit
const updateUser = (id, newObject) => {
  return axios.patch(`${baseUrl}/${id}`, newObject);
};

// const removeUser = (id) => {
//   return axios.delete(`${baseUrl}/${id}`);
// };

const getUserByMail = (mail) => {
  return axios.get(`${baseUrl}/search/${mail}`);
};

const usersService = {
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  createUser: createUser,
  loginUser: loginUser,
  signupUser: signupUser,
  getUserByMail: getUserByMail,
  updateUser: updateUser,
};

export default usersService;
