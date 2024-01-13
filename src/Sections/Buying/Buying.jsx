import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header";
import { Link, useNavigate } from "react-router-dom";
import { Fade } from "react-reveal";
import { ToastContainer, toast, Slide } from "react-toastify";
import axios from "axios";
function Buying() {
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
  const [woodTypes, setWoodTypes] = useState([]);

  useEffect(() => {
    const getWoodTypes = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/buy-wood-types`)
        .then((res) => {
          setWoodTypes(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getWoodTypes();
  }, []);

  const [charges, setCharges] = useState(false);

  const [buywoodData, setBuyWoodData] = useState({
    wood_type: 0,
    circumference: "",
    height: "",
    volume: 0,
    total: 0,
  });

  const CalculateCharges = () => {
    if (
      buywoodData.wood_type &&
      buywoodData.circumference &&
      buywoodData.height
    ) {
      setCharges(true);
      const radius = parseFloat(buywoodData.circumference) / (2 * Math.PI);
      const cylinderVolume =
        Math.PI * radius ** 2 * parseFloat(buywoodData.height);
      const type_details = woodTypes.filter(
        (t) => t._id === buywoodData.wood_type
      );

      let total = cylinderVolume * type_details[0].price;

      setBuyWoodData({
        ...buywoodData,
        volume: cylinderVolume.toFixed(2),
        total: total.toFixed(2),
      });
    } else {
      error("Fill the Inputs");
    }
  };

  const CheckOut = async() => {
    if (charges) {
      // Save the package data to localStorage and navigate to the checkout page
      localStorage.setItem("buywood", JSON.stringify(buywoodData));
      try {
        const body = {
          buy_wood_type_id: buywoodData.wood_type,
          circumference: buywoodData.circumference,
          height: buywoodData.height,
          volume: buywoodData.volume,
          total: buywoodData.total,
        }
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/buying-order`, body)
        // localStorage.removeItem("package");
        navigate("/buying/checkout", { state: { id: res.data._id}});
      } catch (error) {
        console.log(error)
      }
     
    } else {
      error("Fill the Inputs");
    }
  };
  return (
    <>
      <Header />

      <section className="page-container selling-container">
        <div className="title-section">
          <span>Buying</span>
        </div>
        <div className="detail-box selling-box">
          <div className="selling-item-section">
            <div className="selling-items">
              <div className="selling-items-title">Buying Items</div>
            </div>
            <div className="seeling-detail-box">
              <div className="selling-detail-item dust-selling">
                <div className="dust-input">
                  <div className="input-row">
                    <span className="input-title">Wood Type</span>
                    <select
                      name=""
                      id="type"
                      onChange={(event) => {
                        // Update the package data with the selected tree type
                        setBuyWoodData({
                          ...buywoodData,
                          wood_type: event.target.value,
                        });
                      }}
                    >
                      <option value=""> Select type</option>
                      {woodTypes.map((type, typeIndex) => {
                        return (
                          <>
                            <option value={type._id} key={typeIndex}>
                              {type.name} - Rs.{type.price}.00
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="input-row">
                    <span className="input-title">Circumference (ft) </span>
                    <input
                      type="text"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value) || value === "") {
                          setBuyWoodData({
                            ...buywoodData,
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
                          setBuyWoodData({
                            ...buywoodData,
                            height: value,
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="input-row margin-top">
                    <button
                      className="primary-btn"
                      onClick={() => CalculateCharges()}
                    >
                      Calculate the Offer
                    </button>
                  </div>
                  {charges && (
                    <>
                      <Fade bottom duration={1000} distance="10px">
                        <div className="cost-box">
                          <div className="cost-box-item">
                            <span className="cost-title">Volume</span>
                            <span className="cost-amount">
                              {buywoodData.volume}
                            </span>
                          </div>

                          <div className="cost-box-item">
                            <span className="cost-title">Total</span>
                            <span className="cost-amount">
                              Rs.{buywoodData.total}
                            </span>
                          </div>
                        </div>
                      </Fade>
                    </>
                  )}
                </div>
              </div>
              <Fade right duration={1000} distance="50px">
                <div className="button-group">
                  <button
                    className="main-btn  checkout-btn"
                    onClick={() => CheckOut()}
                  >
                    Checkout
                  </button>
                </div>
              </Fade>
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

export default Buying;
