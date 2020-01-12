import React, { useContext, useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    name: "",
    password: ""
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Split Link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Sign In</span>
            <div>
              <div className="input-field ">
                <input
                  placeholder="Enter email"
                  id="email"
                  type="email"
                  name="email"
                  className="yellow-input"
                  value={form.email}
                  onChange={changeHandler}
                ></input>
                <label htmlFor="email">email</label>
              </div>
              <div className="input-field ">
                <input
                  placeholder="Enter password"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  className="yellow-input"
                  onChange={changeHandler}
                ></input>
                <label htmlFor="password">password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              onClick={loginHandler}
              disabled={loading}
            >
              log In
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
