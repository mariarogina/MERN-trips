import React, { useState, useEffect } from "react";
import Card from "./Card";
import "../index.css";
import storiesService from "../services/storiesService";

// user postings at /home

const CardsLayout = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    storiesService.getAllStories().then((response) => {
      console.log("promise fulfilled");
      console.log(response.data);
      setStories(response.data);
    });
  }, []);

  console.log(stories);

  return (
    <div className="cardsWrapper">
      {stories.map((i) => {
        return <Card data={i} />;
      })}
    </div>
  );
};

export default CardsLayout;
