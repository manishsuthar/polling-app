import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ activeTab }) => {
  return (
    <div className="sidebar" data-color="white" data-active-color="danger">
      <div className="logo">
        <a href="" className="simple-text logo-mini">
          <div className="logo-image-small">
            <h3>LOGO</h3>
          </div>
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          <li className={activeTab === 1 ? "active " : ""}>
            <Link to={"/"}>
              <i className="nc-icon nc-bank"></i>
              <p>Dishes</p>
            </Link>
          </li>
          <li className={activeTab === 2 ? "active " : ""}>
            <Link to={"/list"}>
              <i className="nc-icon nc-bank"></i>
              <p>Polling</p>
            </Link>
          </li>
          <li className={activeTab === 3 ? "active " : ""}>
            <Link to={"/result"}>
              <i className="nc-icon nc-bank"></i>
              <p>Result</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
