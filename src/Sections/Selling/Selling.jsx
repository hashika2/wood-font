import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header";
import { Link } from "react-router-dom";
import WoodSell from "./WoodSell";
import FireWood from "./FireWood";
import Dust from "./Dust";
import { ToastContainer, toast, Slide } from "react-toastify";
function Selling() {
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
  const [sellingType, setSellingType] = useState("");

  useEffect(() => {
    setSellingType("wood");
  }, []);

  return (
    <>
      <Header />

      <section className="page-container selling-container">
        <div className="title-section">
          <span>Selling</span>
        </div>
        <div className="detail-box selling-box">
          <div className="selling-item-section">
            <div className="selling-items">
              <div className="selling-items-title">Selling Items</div>
              <div className="selling-items-box">
                <div
                  className={`selling-item ${
                    sellingType === "wood" && "seleceted-selling-item"
                  }`}
                  onClick={() => setSellingType("wood")}
                >
                  Wood
                </div>
                <div
                  className={`selling-item ${
                    sellingType === "fire_wood" && "seleceted-selling-item"
                  }`}
                  onClick={() => setSellingType("fire_wood")}
                >
                  Fire Wood
                </div>
                <div
                  className={`selling-item ${
                    sellingType === "dust" && "seleceted-selling-item"
                  }`}
                  onClick={() => setSellingType("dust")}
                >
                  Dust
                </div>
              </div>
            </div>
            <div className="seeling-detail-box">
              {sellingType === "wood" && (
                <WoodSell error={error} success={success} />
              )}
              {sellingType === "fire_wood" && (
                <FireWood error={error} success={success} />
              )}
              {sellingType === "dust" && (
                <Dust error={error} success={success} />
              )}
            </div>
          </div>
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

export default Selling;
