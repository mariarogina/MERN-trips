import React from "react";
import "../../index.css";
import { Link } from "react-router-dom";


const User = ({ data }) => {
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();

    return age;
  }
  return (
    <div className="userWrap">
      User
      <p>
        Traveller:<b> {data.nimi}</b>
      </p>
      <p>
        Age:<b> {getAge(data.syntymävuosi)}</b>
      </p>
      <p>
        From: <b>{data.paikkakunta}</b>
      </p>
      <p>
        Mail: <b>{data.sähköpostiosoite}</b>
      </p>
      <p>
        <Link to="/usersstories" state={{ mail: data.sähköpostiosoite }}>
          {data.nimi}'s Stories
        </Link>
      </p>
    </div>
  );
};

export default User;
