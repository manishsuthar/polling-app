import React, { Component } from "react";
import Login from "./components/Login/Login";
import LoggedInBlock from "./components/LoggedInBlock/LoggedInBlock";
import "./App.css";
class App extends Component {
  state = {
    isLoggedIn: true,
    user: { id: 100 },
  };

  onLoginSuccess = (user) => {
    this.setState({ isLoggedIn: true, user });
  };

  onClickLogout = () => {
    this.setState({ isLoggedIn: false, user: null });
  };

  render() {
    const { isLoggedIn, user } = this.state;
    return (
      <React.Fragment>
        {!isLoggedIn ? (
          <Login onLoginSuccess={this.onLoginSuccess} />
        ) : (
          <LoggedInBlock onClickLogout={this.onClickLogout} user={user} />
        )}
      </React.Fragment>
    );
  }
}

export default App;
