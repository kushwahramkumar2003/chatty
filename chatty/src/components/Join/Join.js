import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";

let user;
const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};
const Join = () => {
  const [name, setName] = useState("");
  return (
    <div>
      <div className="JoinPage">
        <div className="JoinContainer">
          {/* <img src="" alt="" /> */}
          <h1>C Chat</h1>
          <input
            type="text"
            id="joinInput"
            placeholder="Enter Your Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Link
            to="/chat"
            onClick={(event) => {
              if (!name) {
                event.preventDefault();
              }
            }}
          >
            <button className="joinbtn" onClick={sendUser}>
              Login{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
export { user };
