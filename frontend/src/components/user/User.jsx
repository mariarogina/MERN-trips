import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const User = ({ data }) => {
  const getByKeyPart = (obj, keyPart) => {
    const key = Object.keys(obj).find((item) => item.includes(keyPart));
    return key ? obj[key] : "";
  };

  function getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    return today.getFullYear() - birthDate.getFullYear();
  }

  const userEmail = getByKeyPart(data, "posti");
  const birthYear = getByKeyPart(data, "syntym");

  return (
    <div className="userWrap">
      User
      <p>
        Traveller:<b> {data.nimi}</b>
      </p>
      <p>
        Age:<b> {getAge(birthYear)}</b>
      </p>
      <p>
        From: <b>{data.paikkakunta}</b>
      </p>
      <p>
        Mail: <b>{userEmail}</b>
      </p>
      <p>
        <Link
          to={{
            pathname: `/usersstories/${encodeURIComponent(userEmail)}`,
            state: { mail: userEmail },
          }}
        >
          {data.nimi}'s Stories
        </Link>
      </p>
    </div>
  );
};

export default User;
