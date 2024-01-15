import React from "react";
import Header from "../Layout/Header";
import { Fade } from "react-reveal";
function Login() {
  return (
    <>
      <Header />

      <section className="page-container login-container">
        <h1>Create Your Account</h1>
        <div className="login">
        <div className="input-row">
            <span className="input-title">Name</span>
            <input type="text" />
          </div>
          <div className="input-row">
            <span className="input-title">Email</span>
            <input type="text" />
          </div>
          <div className="input-row">
            <span className="input-title">Contact Number</span>
            <input type="text" />
          </div>
          <div className="input-row">
            <span className="input-title">Password</span>
            <input type="password" />
          </div>
          <div className="input-row">
            <span className="input-title">Confirm Password</span>
            <input type="password" />
          </div>
          <div className="input-row margin-top">
            <button className="primary-btn">Create Account</button>
          </div>
        </div>
        <a href="" className="signup">Already have an Account? Please Sign in</a>
      </section>
    </>
  );
}

export default Login;
