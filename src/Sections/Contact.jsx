import React from "react";
import Header from "../Layout/Header";
import { Fade } from "react-reveal";
function Contact() {
  return (
    <>
      <Header />

      <section className="page-container login-container">
        <h1>Contact Us</h1>
        <p>Contact us for more information</p>
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
            <span className="input-title">Message</span>
            <textarea name="" id="" cols="30" rows="8"></textarea>
          </div>
          <div className="input-row margin-top">
            <button className="primary-btn">Contact Us</button>
          </div>
        </div>
        
      </section>
    </>
  );
}

export default Contact;
