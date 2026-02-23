import axios from "axios";
const baseUrl = "http://localhost:5000/api/stories";

//get
const getAllStories = () => {
  return axios.get(baseUrl);
};

const getStoryById = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};

//add
const createStory = async (newObject, token) => {
  const config = {
    method: "post",
    url: baseUrl,
    headers: { Authorization: "Bearer " + token },
    data: newObject,
  };

  try {
    let res = await axios(config);
    return res.data;
  } catch (err) {
    alert(err);
    return;
  }

  // return axios.post(baseUrl, newObject);
};

//edit
const updateStory = async (id, newObject, token) => {
  const config = {
    method: "patch",
    url: `${baseUrl}/${id}`,
    headers: { Authorization: "Bearer " + token },
    data: newObject,
  };

  try {
    let res = await axios(config);
    return res.data;
  } catch (err) {
    alert(err);
    return;
  }
  // return axios.patch(`${baseUrl}/${id}`, newObject);
};

//delete
const removeStory = async (id, token) => {
  const config = {
    method: "delete",
    url: `${baseUrl}/${id}`,
    headers: { Authorization: "Bearer " + token },
  };

  try {
    let res = await axios(config);
    return res.data;
  } catch (err) {
    alert(err);
    return;
  }
  // return axios.delete(`${baseUrl}/${id}`);
};

//by user

const getStoriesByUserName = async (name, token) => {
  // const config = {
  //   method: "get",
  //   url: `${baseUrl}/user/${name}`,
  //   headers: { Authorization: "Bearer " + token },
  // };

  // try {
  //   let res = await axios(config);
  //   return res.data;
  // } catch (err) {
  //   alert(err);
  //   return;
  // }
  return axios.get(`${baseUrl}/user/${name}`);
};

const storiesService = {
  getAllStories: getAllStories,
  getStoryById: getStoryById,
  createStory: createStory,
  updateStory: updateStory,
  removeStory: removeStory,
  getStoriesByUserName: getStoriesByUserName,
};

export default storiesService;
