import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import StoryForm from "./StoryForm";

const AddStory = () => {
  return (
    <div className="storiesWrapper">
      <StoryForm />
    </div>
  );
};

export default AddStory;
