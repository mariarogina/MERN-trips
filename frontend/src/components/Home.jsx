import React from "react";
import "../index.css";
import CardsLayout from "./CardsLayout";

const Home = () => {
  return (
    <div>
      <div className="textTitle">
        <h1>Travel Stories</h1>
      </div>
      <div className="hero">
        <img
          className="heroImg"
          src="https://images.unsplash.com/photo-1473625247510-8ceb1760943f?q=80&w=1111&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
