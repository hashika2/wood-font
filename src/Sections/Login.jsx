import React from "react";
import Header from "../Layout/Header";
import { Fade } from "react-reveal";
function Login() {
  return (
    <>
      <Header />

      <section className="page-container login-container">
        <h1>Sign in to Your Account</h1>
        <div className="login">
          <div className="input-row">
            <span className="input-title">User Name/ Email</span>
            <input type="text" />
          </div>
          <div className="input-row">
            <span className="input-title">Password</span>
            <input type="password" />
          </div>
          <div className="input-row margin-top">
            <button className="primary-btn">Sign in</button>
          </div>
        </div>
        <a href="" className="signup">Don't you have an Account? Please Sign up</a>
      </section>
    </>
  );
}

export default Login;
