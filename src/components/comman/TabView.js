import React from "react";
import { Link } from "react-router-dom";

export const TabView = ({ tabInfo = [], activeTab, onChangeTab }) => {
  return (
    <div className="d-flex">
      {tabInfo.map((e, i) => (
        <Tab
          {...e}
          key={`tab${i}`}
          onChangeTab={onChangeTab}
          activeTab={activeTab}
        />
      ))}
    </div>
  );
};

const Tab = ({ name, index, path, activeTab, onChangeTab }) => {
  const btnClass = activeTab === index ? "btn-primary" : "btn-light";
  return (
    <Link
      to={path}
      onClick={() => onChangeTab(index)}
      className={`tab-button shadow-sm ${btnClass}`}
    >
      <div>{name}</div>
    </Link>
  );
};
