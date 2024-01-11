import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";
function Cutting() {
  return (
    <>
      <Header />

      <section className="fixed-image"></section>
      <section className="page-container">
        <div className="detail-box">
          <div className="border-box">
            <div className="detail-title">Cutting</div>
            <div className="align-box">
              <Fade bottom duration={1000} distance="40px">
                <div className="cutting-paths">
                  <Link to="/cutting/full-package">
                    <div className="path">Full Package</div>
                  </Link>
                  <Link to="/cutting/cutting-only">
                    <div className="path">Cutting Only</div>
                  </Link>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cutting;
