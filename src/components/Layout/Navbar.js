import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ activeTab }) => {
  return (
    <div className="sidebar" data-color="white" data-active-color="danger">
      <div className="logo p-0">
        <a
          href=""
          className="simple-text"
          style={{ display: "table", margin: "auto" }}
        >
          <div className="logo-image-small">
            <img
              style={{ height: "35px", width: "35px" }}
              src="https://iconape.com/wp-content/png_logo_vector/zomato-logo.png"
            />
          </div>
          <span>Dish</span>
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          <li className={activeTab === 1 ? "active " : ""}>
            <Link to={"/"}>
              <i className="">&#8859;</i>
              <p>&nbsp;Dishes</p>
            </Link>
          </li>
          <li className={activeTab === 2 ? "active " : ""}>
            <Link to={"/list"}>
              <i className="">&#9745;</i>
              <p>Polling</p>
            </Link>
          </li>
          <li className={activeTab === 3 ? "active " : ""}>
            <Link to={"/result"}>
              <i className="">&#9813;</i>
              <p>Result</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
