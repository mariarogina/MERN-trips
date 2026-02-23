const HttpError = require("../models/http-error");
const Story = require("../models/story-model");
const User = require("../models/user-model");

//get all from Atlas (*)
const getAllStories = async (req, res, next) => {
  let stories;
  try {
    stories = await Story.find();
  } catch (err) {
    const error = new HttpError(
      "Something wrong here, cannot fetch stories",
      500
    );
    return next(error);
  }
  if (!stories || stories.length == 0) {
    const error = new HttpError("Could not find stories", 404);
    return next(error);
  }
  res.json(stories);
};

//get by Id Atlas
const getStoryById = async (req, res, next) => {
  const storyId = req.params.id;
  let story;

  // Mongoose kuitenkin sallii tamankin suorittamisen asyncina
  try {
    story = await Story.findById(storyId);
  } catch (err) {
    console.info(err);
    // taalla on jarjestelman tuottamat virheet
    const error = new HttpError(
      "something wrong here, cannot find a story",
      500
    );
    return next(error);
  }

  // tassa kasitellaan tilane jossa tieto ei loydy kannasta
  if (!story) {
    const error = new HttpError("Could not find an story by given id", 404);
    return next(error);
  }
  /*
  res.json({story});
  Muunnetaan json javascript objektiksi, jotta sita on suorempi kasitella clientissa, poistetaan myos mongodb:n _id:sta alaviiva eli saadaan id-kentta */
  res.json({ story: story.toObject() });
};

//create story
const createStory = async (req, res, next) => {
  const { tekijänNimi, paikkakunta, pvm, kohde, tarina, kuva, tekijänId } =
    req.body;
  const createdStory = new Story({
    tekijänNimi,
    paikkakunta,
    pvm,
    kohde,
    tarina,
    kuva,
    tekijänId,
  });
  try {
    await createdStory.save();
  } catch (err) {
    const error = new HttpError(
      "Creating story failed, please try again!",
      500
    );
    return next(error);
  }
  res.status(201).json(createdStory);
};

//delete story in Atlas
const deleteStoryById = async (req, res, next) => {
  const storyId = req.params.id;
  console.log(storyId);
  let story;
  try {
    story = await Story.findById(storyId);
  } catch (err) {
    const error = new HttpError("deleting story failed", 500);
    return next(error);
  }
  if (story) {
    try {
      await story.remove();
    } catch (err) {
      const error = new HttpError("deleting story failed ", 500);
      return next(error);
    }
  } else {
    const error = new HttpError("Could not find that story", 404);
    return next(error);
  }
  res.status(200).json({ message: "Deleted story" });
};

//update story in Atlas

const updateStoryById = async (req, res, next) => {
  const { paikkakunta, pvm, kohde, tarina, kuva } = req.body;
  const storyId = req.params.id;
  let story;
  try {
    story = await Story.findById(storyId);
  } catch (err) {
    const error = new HttpError("updating story failed", 500);
    return next(error);
  }
  if (story) {
    story.paikkakunta = paikkakunta;
    story.pvm = pvm;
    story.kohde = kohde;
    story.tarina = tarina;
    story.kuva = kuva;

    try {
      await story.save();
    } catch (err) {
      const error = new HttpError("updating story failed", 500);
      return next(error);
    }
  } else {
    const error = new HttpError("Could not find that story", 404);
    return next(error);
  }
  res.json({ story: story.toObject({ getters: true }) });
};

//get stories by user id (*)
const getStoriesByUser = async (req, res, next) => {
  const userName = req.params.name;
  let stories;
  try {
    stories = await Story.find({
      tekijänNimi: userName,
    });
  } catch (err) {
    const error = new HttpError(
      "Something wrong here, cannot fetch story",
      500
    );
    return next(error);
  }
  if (!stories || stories.length == 0) {
    const error = new HttpError("Could not find stories", 404);
    return next(error);
  }
  res.json(stories);
};

exports.getAllStories = getAllStories;
exports.getStoryById = getStoryById;
exports.createStory = createStory;
exports.deleteStoryById = deleteStoryById;
exports.updateStoryById = updateStoryById;
exports.getStoriesByUser = getStoriesByUser;
