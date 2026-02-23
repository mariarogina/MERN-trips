import React, { useState, useEffect } from "react";
import "../../index.css";
import User from "./User";
import usersService from "../../services/usersService";
import { Link } from "react-router-dom";

//users table
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersService.getAllUsers().then((response) => {
      console.log("promise fulfilled");
      console.log(response.data);
      setUsers(response.data);
    });
  }, []);

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();

    return age;
  }

  return (
    <div className="usersWrapper">
      <table border="0" style={{ width: "90%", margin: "auto" }}>
        <tbody>
          <tr className="tableRow">
            <th className="tableHead">Nimi</th>
            <th className="tableHead">Paikka</th>
            <th className="tableHead">Ikä</th>
            <th className="tableHead">Kuva</th>
          </tr>
          {users.map((user) => {
            return (
              <tr className="tableRow" key={user._id}>
                <td className="tableCell">
                  <Link
                    to="/usersstories"
                    state={{ mail: user.sähköpostiosoite }}
                  >
                    {user.nimi}
                  </Link>
                </td>
                <td className="tableCell">{user.paikkakunta}</td>
                <td className="tableCell">{getAge(user.syntymävuosi)}</td>
                <td className="tableCell">
                  <img
                    style={{ width: "100px", height: "100px" }}
                    src={user.valokuvanNimi}
                    alt=""
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div className="usersHeader">
        <h2>Users</h2>
      </div>
      <ul>
        {users.map((i) => {
          return <User data={i} key={i._id} />;
        })}
      </ul> */}
    </div>
  );
};

export default Users;
