import React, { useEffect } from "react";
import Header from "./Layout/Header";
import background from "./assets/img/wood-back.jpg";
import cutting from "./assets/img/cutting.jpg";
import buying from "./assets/img/buying.jpg";
import selling from "./assets/img/selling.jpg";
import logo from "./assets/img/logo.png";
import { ToastContainer, toast, Slide } from "react-toastify";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";
function Home() {
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
  useEffect(() => {
    const checkMessage = () => {
      let successMessage = localStorage.getItem("success");
      success(successMessage);
      localStorage.removeItem("success");
    };
    checkMessage();
  }, []);
  return (
    <>
      <Header />
      <section className="main-intro">
        <img className="background-img" src={background} alt="" />
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </section>
      <section className="fixed-image"></section>
      <Fade bottom duration={2500} distance="50px">
        <section className="what-we-do">
          <div className="title page-title">What We Do ..?</div>
          <div className="description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </div>
        </section>
      </Fade>
      <section className="services">
        <div className="title page-title">Our Services</div>
        <div className="services-item-group">
          <Fade bottom duration={2500} distance="50px">
            <Link to="/cutting" className="services-item">
              <div className="cutting-title">Cutting</div>
              <div className="image">
                <img className="cutting-img" src={cutting} alt="" />
              </div>
            </Link>
          </Fade>
          <Fade bottom duration={2500} distance="50px">
            <Link to="/buying" className="services-item">
              <div className="cutting-title">BUying</div>
              <div className="image">
                <img className="cutting-img" src={buying} alt="" />
              </div>
            </Link>
          </Fade>
          <Fade bottom duration={2500} distance="50px">
            <Link to="/selling" className="services-item">
              <div className="cutting-title">Selling</div>
              <div className="image">
                <img className="cutting-img" src={selling} alt="" />
              </div>
            </Link>
          </Fade>
          <Fade bottom duration={2500} distance="50px">
            <Link to="/products" className="services-item">
              <div className="cutting-title">Products</div>
              <div className="image">
                <img className="cutting-img" src={selling} alt="" />
              </div>
            </Link>
          </Fade>
        </div>
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

export default Home;
