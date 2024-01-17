import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import Header from "../../Layout/Header";
function FullPackageFrom({ ChangeStep, setPath, packageData, setPackageData }) {
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

  const [types, setTypes] = useState([]);
  useEffect(() => {
    const getTypes = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/tree-types`)
        .then((res) => {
          setTypes(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getTypes();
  }, []);

  const [cleanFee, setCleanFee] = useState(0);
  const [pieceFee, setPieceFee] = useState(2000.0);
  const [loadFee, setLoadFee] = useState(3000.0);

  const [charges, setCharges] = useState(false);

  const CalculateCharges = () => {
    if (
      packageData.type &&
      packageData.circumference &&
      packageData.height &&
      packageData.distance
    ) {
      setCharges(true);
      let circumference = parseFloat(packageData.circumference);
      let height = parseFloat(packageData.circumference);

      let volume = (circumference / 4) * height;

      const type_details = types.filter((t) => t.id === packageData.type);

      let subtotal = volume * type_details[0].cube_price;

      setCleanFee(type_details[0].clean_price);
      console.log(volume * type_details[0].cube_price);
      let over_transport = parseFloat(packageData.distance) - 1;

      let transport_fee = 1 * 2000 + over_transport * 1000;

      let total = subtotal + transport_fee + cleanFee + pieceFee + loadFee;
      setPackageData({
        ...packageData,
        transportFee: transport_fee,
        total: parseFloat(total),
        subtotal: parseFloat(subtotal),
      });
    } else {
      error("Fill the Inputs");
    }
  };

  const CheckOut = () => {
    if (charges) {
      localStorage.setItem("order", packageData);
      ChangeStep(2);
    } else {
      error("Fill the Inputs");
    }
  };

  const GoBack = () => {
    setPackageData({
      type: 0,
      circumference: "",
      height: "",
      distance: "",
      subtotal: 0,
      transportFee: 0,
      total: 0,
    });

    setPath(null);
  };

  return (
    <>
      <Header />

      <section className="fixed-image"></section>
      <section className="page-container">
        <div className="detail-box">
          <div className="border-box">
            <div className="detail-title">Cutting</div>
            <div className="cutting-paths">
              <div className="des-title">Full Package</div>
              <div className="page-form">
                <div className="input-row">
                  <span className="input-title">Tree Type </span>

                  <select
                    name=""
                    id="type"
                    onChange={(event) => {
                      setPackageData({
                        ...packageData,
                        type: parseInt(event.target.value),
                      });
                    }}
                  >
                    <option value=""> Select type</option>
                    {types?.map((type, index) => {
                      return (
                        <option value={type.id} key={index}>
                          {type.type}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="input-row">
                  <span className="input-title">Circumference (ft) </span>
                  <input
                    type="text"
                    value={packageData.circumference}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value) || value === "") {
                        setPackageData({
                          ...packageData,
                          circumference: value,
                        });
                      }
                    }}
                  />
                </div>
                <div className="input-row">
                  <span className="input-title">Height (ft)</span>
                  <input
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value) || value === "") {
                        setPackageData({
                          ...packageData,
                          height: value,
                        });
                      }
                    }}
                    value={packageData.height}
                  />
                </div>
                <div className="input-row">
                  <span className="input-title">Distance (Km)</span>
                  <input
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value) || value === "") {
                        setPackageData({
                          ...packageData,
                          distance: value,
                        });
                      }
                    }}
                    value={packageData.distance}
                  />
                </div>
                <div className="input-row margin-top">
                  <button
                    className="primary-btn"
                    onClick={() => CalculateCharges()}
                  >
                    Calculate the Cost
                  </button>
                </div>
              </div>
              {charges && (
                <>
                  <div className="cost-box">
                    <div className="cost-box-item">
                      <span className="cost-title">sub total</span>
                      <span className="cost-amount">
                        Rs.{packageData.subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="cost-box-item">
                      <span className="cost-title">Clean the wood</span>
                      <span className="cost-amount">
                        Rs.{cleanFee.toFixed(2)}
                      </span>
                    </div>
                    <div className="cost-box-item">
                      <span className="cost-title">Piece the wood</span>
                      <span className="cost-amount">
                        Rs.{pieceFee.toFixed(2)}
                      </span>
                    </div>
                    <div className="cost-box-item">
                      <span className="cost-title">load</span>
                      <span className="cost-amount">
                        Rs.{loadFee.toFixed(2)}
                      </span>
                    </div>
                    <div className="cost-box-item last-normal">
                      <span className="cost-title">transport</span>
                      <span className="cost-amount">
                        Rs.{packageData.transportFee.toFixed(2)}
                      </span>
                    </div>
                    <div className="cost-box-item">
                      <span className="cost-title">Total</span>
                      <span className="cost-amount">
                        Rs.{packageData.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="button-group">
                <button className="main-btn  back-btn" onClick={() => GoBack()}>
                  Back
                </button>
                <button
                  className="main-btn  checkout-btn"
                  onClick={() => CheckOut()}
                >
                  Checkout
                </button>
              </div>
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

export default FullPackageFrom;
