import React, { useState } from "react";
import { ValidateUser } from "../../Util/LoginUtil";
import { Button, Input } from "../comman/Input";
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const onSubmitClick = async () => {
    setError(null);
    const { result, error } = await ValidateUser(userName, password);
    if (!error) {
      onLoginSuccess(result);
    } else {
      setError(error);
    }
  };
  return (
    <div className="content">
      <div className="container">
        <div name="Login" className="row justify-content-center">
          <div className="col-md-6 contents">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="form-block">
                  <div className="mb-4">
                    <h3>
                      Sign In to <strong>App</strong>
                    </h3>
                    <p className="mb-4">App for Manageing items</p>
                  </div>
                  <form>
                    <Input
                      type={"text"}
                      label="Username"
                      placeholder="Username"
                      onChange={setUserName}
                      name="Username"
                      value={userName}
                    />
                    <Input
                      type="password"
                      label="Password"
                      placeholder="Password"
                      onChange={setPassword}
                      name="Password"
                      value={password}
                    />
                    {!!error ? (
                      <div className="m-1 login-error alert alert-danger">
                        {error}
                      </div>
                    ) : null}
                    <Button
                      className="btn btn-pill text-white btn-block btn-primary"
                      onClick={onSubmitClick}
                      text="Submit"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
