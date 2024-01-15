import React, { useState } from "react";
import Header from "../Layout/Header";
import { Fade } from "react-reveal";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        if(password !== confirmPassword){
          error("Passwords are not matched");
          return;
        }
        const body = {
          email,
          password,
          name
        }
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, body)
        // localStorage.removeItem("package");
        navigate("/", { state: { id: res.data._id}});
        success("Sign In is Successfull")
      } catch (err) {
        console.log(err.response)
        error(err.response.data.error)
      }
  };

  return (
    <>
      {/* <Header /> */}

      <section className="page-container login-container">
        <h1>Create Your Account</h1>
        <div className="login">
        <div className="input-row">
            <span className="input-title">Name</span>
            <input type="text" onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="input-row">
            <span className="input-title">Email</span>
            <input type="text" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          {/* <div className="input-row">
            <span className="input-title">Contact Number</span>
            <input type="text" onChange={(e) => setPhone(e.target.value)}/>
          </div> */}
          <div className="input-row">
            <span className="input-title">Password</span>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-row">
            <span className="input-title">Confirm Password</span>
            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>
          <div className="input-row margin-top">
            <button className="primary-btn" onClick={submit}>Create Account</button>
          </div>
        </div>
        <Link to="/" className="signup">Already have an Account? Please Sign in</Link>
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

export default Register;
