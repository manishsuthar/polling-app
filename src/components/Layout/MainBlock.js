import React from "react";
import { Route, Switch } from "react-router-dom";
import { Create } from "../Poll/Create";
import { Points } from "../Poll/Points";
import { Result } from "../Poll/Result";
import Footer from "./Footer";
import Header from "./Header";

const MainBlock = ({ activeTabName, user, actionOnLoad, onLogout }) => {
  return (
    <div className="main-panel">
      <Header activeTabName={activeTabName} onLogout={onLogout} />
      <div className="content">
        <Switch>
          <Route
            path="/"
            exact
            component={() => <Create user={user} onClickNext={actionOnLoad} />}
          />
          <Route
            path="/list"
            exact
            component={() => <Points user={user} onClickNext={actionOnLoad} />}
          />
          <Route
            path="/result"
            exact
            component={() => <Result user={user} onClickNext={actionOnLoad} />}
          />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default MainBlock;
