import React from "react";
import MainBlock from "../Layout/MainBlock";
import Navbar from "../Layout/Navbar";

import "./LoggedInBlock.css";

class LoggedInBlock extends React.PureComponent {
  tabs = { 1: "Create", 2: "Polling", 3: "Result" };

  state = {
    activeTab: 1,
  };
  componentDidMount() {
    this.actionOnLoad();
  }
  actionOnLoad = () => {
    const { pathname } = window.location;
    let activeTab = 1;
    if (pathname === "/") activeTab = 1;
    if (pathname === "/list") activeTab = 2;
    if (pathname === "/result") activeTab = 3;
    this.setState({ activeTab });
  };

  onChangeTab = (tabIndex) => {
    this.setState({ activeTab: tabIndex });
  };

  render() {
    const { activeTab } = this.state;
    const { user } = this.props;
    const activeTabName = this.tabs[activeTab];
    return (
      <div className="wrapper">
        <Navbar activeTab={activeTab} />
        <MainBlock
          onLogout={this.props.onClickLogout}
          activeTabName={activeTabName}
          user={user}
          actionOnLoad={this.actionOnLoad}
        />
      </div>
    );
  }
}

export default LoggedInBlock;
