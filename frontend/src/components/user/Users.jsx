import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import usersService from "../../services/usersService";

// Users table
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersService.getAllUsers().then((response) => {
      setUsers(response.data);
    });
  }, []);

  const getByKeyPart = (obj, keyPart) => {
    const key = Object.keys(obj).find((item) => item.includes(keyPart));
    return key ? obj[key] : "";
  };

  function getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    return today.getFullYear() - birthDate.getFullYear();
  }

  return (
    <div className="usersWrapper">
      <table border="0" style={{ width: "90%", margin: "auto" }}>
        <tbody>
          <tr className="tableRow">
            <th className="tableHead">Name</th>
            <th className="tableHead">Age</th>
            <th className="tableHead">Place</th>
            <th className="tableHead">Pic</th>
          </tr>
          {users.map((user) => {
            const userEmail = getByKeyPart(user, "posti");
            const birthYear = getByKeyPart(user, "syntym");

            return (
              <tr className="tableRow" key={user._id}>
                <td className="tableCell">
                  <Link
                    to={{
                      pathname: `/usersstories/${encodeURIComponent(userEmail)}`,
                      state: { mail: userEmail },
                    }}
                  >
                    {user.nimi}
                  </Link>
                </td>
                <td className="tableCell">{getAge(birthYear)}</td>
                <td className="tableCell">{user.paikkakunta}</td>
                <td className="tableCell">
                  <img
                    style={{ width: "100px", height: "100px" }}
                    src={user.valokuvanNimi}
                    alt="User"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
