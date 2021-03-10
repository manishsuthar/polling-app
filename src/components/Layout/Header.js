import React from "react";

const Header = ({ activeTabName, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
      <div className="container-fluid">
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              className="navbar-toggler"
              onClick={OpenNavbar}
            >
              <span className="navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </button>
          </div>
          <a className="navbar-brand">{activeTabName}</a>
        </div>
        <button
          className="bnt-switch"
          type="button"
          data-toggle="collapse"
          data-target="#navigation"
          aria-controls="navigation-index"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={onLogout}
        >
          <span>&#x23FB;</span>
        </button>
      </div>
    </nav>
  );
};

export default Header;

window.isOpenSideBar = false;
const OpenNavbar = () => {
  const element = document.getElementsByTagName("html")[0];
  element.classList.toggle("nav-open");
  if (window.isOpenSideBar) {
    window.isOpenSideBar = false;
    document.removeEventListener("click", OpenNavbar);
  } else {
    window.isOpenSideBar = true;
    document.addEventListener("click", OpenNavbar);
  }
};
