import React from "react";
import { Switch, Route } from "react-router-dom";
import { TabView } from "../comman/TabView";
import { Create } from "../Poll/Create";
import { Points } from "../Poll/Points";
import { Result } from "../Poll/Result";

import "./LoggedInBlock.css";

class LoggedInBlock extends React.PureComponent {
  tabs = [
    { name: "Create", index: 1, path: "/", value: "CREATE" },
    { name: "Polling", index: 2, path: "/list", value: "DETAILS" },
  ];
  state = {
    activeTab: 1,
    showTabs: true,
    activeTabName: "Create Dish",
  };
  componentDidMount() {
    this.actionOnLoad();
  }
  actionOnLoad = () => {
    const { pathname } = window.location;
    let activeTab = 1;
    let showTabs = true;
    if (pathname === "/list") activeTab = 2;
    if (pathname === "/result") {
      activeTab = 1;
      showTabs = false;
    }
    const activeTabName = activeTab === 1 ? "Create" : "Polling";
    this.setState({ activeTab, showTabs, activeTabName });
  };
  onChangeTab = (tabIndex) => {
    const activeTabName = tabIndex === 1 ? "Create" : "Polling";
    this.setState({ activeTab: tabIndex, activeTabName });
  };

  render() {
    const { activeTab, showTabs, activeTabName } = this.state;
    const { user } = this.props;
    return (
      <div name="LoggedInBlock" className="container">
        <div name="Login" className="row justify-content-center">
          <div className="col-md-12 contents">
            <div className="row">
              <div className="col-12 header p-2 pr-4">
                {activeTabName}
                <button
                  onClick={this.props.onClickLogout}
                  className="btn btn-sm btn-secondary float-right"
                >
                  logout
                </button>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="form-block logged-in">
                  <div className="mb-2">
                    <div className="view-block">
                      <Switch>
                        <Route
                          path="/"
                          exact
                          component={() => (
                            <Create
                              user={user}
                              onClickNext={this.actionOnLoad}
                            />
                          )}
                        />
                        <Route
                          path="/list"
                          exact
                          component={() => (
                            <Points
                              user={user}
                              onClickNext={this.actionOnLoad}
                            />
                          )}
                        />
                        <Route
                          path="/result"
                          exact
                          component={() => (
                            <Result
                              user={user}
                              onClickNext={this.actionOnLoad}
                            />
                          )}
                        />
                      </Switch>
                    </div>
                    {showTabs ? (
                      <TabView
                        tabInfo={this.tabs}
                        onChangeTab={this.onChangeTab}
                        activeTab={activeTab}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoggedInBlock;
