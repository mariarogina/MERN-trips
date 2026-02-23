import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import StoryEditForm from "./StoryEditForm";
import storiesService from "../../services/storiesService";

const EditStory = ({ editStoryId, setEditStoryId }) => {
  return (
    <div className="storiesWrapper">
      <StoryEditForm editStoryId={editStoryId} />
    </div>
  );
};

export default EditStory;
