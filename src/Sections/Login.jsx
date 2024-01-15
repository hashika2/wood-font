import React, { useState } from "react";
import Header from "../Layout/Header";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const success = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const error = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const submit = async() => {
      // Save the package data to localStorage and navigate to the checkout page
      try {
        const body = {
          email,
          password
        }
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/signin`, body)
        success("Login is Successfull")
        localStorage.setItem("token", res.data?.access_token);
        navigate("/home");
      } catch (err) {
        console.log(err.response)
        error(err.response.data.error)
      }
  };

  return (
    <>
      {/* <Header /> */}

      <section className="page-container login-container">
        <h1>Sign in to Your Account</h1>
        <div className="login">
          <div className="input-row">
            <span className="input-title">User Name/ Email</span>
            <input type="text" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input-row">
            <span className="input-title">Password</span>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="input-row margin-top">
            <button className="primary-btn" onClick={submit}>Sign in</button>
          </div>
        </div>
        <Link to="/register" className="signup">Don't you have an Account? Please Sign up</Link>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </>
  );
}

export default Login;
