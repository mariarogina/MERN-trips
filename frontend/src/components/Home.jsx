import React from "react";
import "../index.css";
import CardsLayout from "./CardsLayout";

const Home = () => {
  return (
    <div>
      <div className="textTitle">
        <h1>Bike Travel Stories</h1>
      </div>
      <div className="hero">
        <img
          className="heroImg"
          src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg"
          alt=""
        />
      </div>
      <div>
        <h2 className="textTitle">User's postings</h2>
      </div>
      <div className="cards-layout">
        <CardsLayout />
      </div>
    </div>
  );
};

export default Home;
