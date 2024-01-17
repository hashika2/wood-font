import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import Header from "../../Layout/Header";
import { Link, useNavigate } from "react-router-dom";
import { Fade } from "react-reveal";
function CuttingOnly({ ChangeStep, setPath }) {
  const navigate = useNavigate();

  // Function to show success toast message
  const success = (message) => {
    // Show a success toast message using react-toastify library
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

  // Function to show error toast message
  const error = (message) => {
    // Show an error toast message using react-toastify library
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

  // State to store tree types
  const [types, setTypes] = useState([]);

  // Fetch tree types from the server on component mount
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

  // State to manage calculation charges
  const [loadFee, setLoadFee] = useState(3000.0);
  const [charges, setCharges] = useState(false);

  // State to store package data
  const [packageData, setPackageData] = useState({
    cutting_type: "cutting_only",
    type: 0,
    circumference: "",
    height: "",
    distance: "",
    subtotal: 0,
    transportFee: 0,
    total: 0,
  });

  // Check for existing package data in localStorage and update the state accordingly
  useEffect(() => {
    const CheckOrder = () => {
      let formData = JSON.parse(localStorage.getItem("package"));
      if (formData) {
        setPackageData({
          type: formData.type,
          circumference: formData.circumference,
          height: formData.height,
          distance: formData.distance,
          subtotal: formData.subtotal,
          transportFee: formData.transportFee,
          total: formData.total,
          volume: formData.volume,
        });
        setCharges(true);
      }
    };
    CheckOrder();
  }, []);

  // Function to calculate charges based on the provided inputs
  const CalculateCharges = () => {
    if (
      packageData.type &&
      packageData.circumference &&
      packageData.height &&
      packageData.distance
    ) {
      setCharges(true);
      const radius = parseFloat(packageData.circumference) / (2 * Math.PI);
      const volume = Math.PI * radius ** 2 * parseFloat(packageData.height);

      // Find the selected tree type details
      const type_details = types.filter((t) => t._id === packageData.type);

      // Calculate the subtotal based on the tree type's cube price and volume
      let subtotal = volume * type_details[0].cube_price;

      // Calculate the transport fee based on the provided distance
      let over_transport = parseFloat(packageData.distance) - 1;
      let transport_fee = 1 * 2000 + over_transport * 1000;

      // Calculate the total cost including the subtotal, transport fee, and load fee
      let total = subtotal + transport_fee + loadFee;

      // Update the package data with the calculated values
      setPackageData({
        ...packageData,
        volume: volume.toFixed(2),
        transportFee: transport_fee,
        total: total.toFixed(2),
        subtotal: subtotal.toFixed(2),
        type_name: type_details[0].type,
      });
    } else {
      error("Fill the Inputs");
    }
  };

  // Function to proceed to checkout if charges are calculated
  const CheckOut = async() => {
    if (charges) {
      // Save the package data to localStorage and navigate to the checkout page
      localStorage.setItem("package", JSON.stringify(packageData));
      try {
        const body = {
          cutting_type: "cutting_only",
          tree_type_id: packageData.type,
          circumference: packageData.circumference,
          height: packageData.height,
          volume: packageData.volume,
          subtotal: packageData.subtotal,
          total: packageData.total,
          distance: packageData.distance,
          transport: packageData.transportFee,
        }
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/cutting-order`, body)
        // localStorage.removeItem("package");
        navigate("/cutting/checkout",{ state: { id: res.data._id}} );
      } catch (error) {
        console.log(error)
      }
    } else {
      error("Fill the Inputs");
    }
  };

  // Function to go back to the previous step and reset the package data
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
            <Fade right duration={1000} distance="50px">
              <div className="detail-title">Cutting - Cutting Only</div>
            </Fade>
            <div className="des-title"></div>
            <Fade right duration={1000} distance="50px">
              <div className="page-form">
                {/* Tree Type selection */}
                <div className="input-row">
                  <span className="input-title">Tree Type </span>
                  <select
                    name=""
                    id="type"
                    onChange={(event) => {
                      // Update the package data with the selected tree type
                      setPackageData({
                        ...packageData,
                        type: event.target.value,
                      });
                    }}
                  >
                    <option value=""> Select type</option>
                    {types?.map((type, index) => {
                      return (
                        <option
                          value={type._id}
                          key={index}
                          // selected={packageData.type === type.id ? true : false}
                        >
                          {type.type}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Input fields for Circumference, Height, and Distance */}
                {/* Input validation allows only numbers and decimal points */}
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

                {/* Button to trigger the cost calculation */}
                <div className="input-row margin-top">
                  <button
                    className="primary-btn"
                    onClick={() => CalculateCharges()}
                  >
                    Calculate the Cost
                  </button>
                </div>
              </div>
            </Fade>
            {/* Display calculated charges if available */}
            {charges && (
              <>
                <Fade bottom duration={1000} distance="10px">
                  <div className="cost-box">
                    <div className="cost-box-item">
                      <span className="cost-title">sub total</span>
                      <span className="cost-amount">
                        Rs.{packageData.subtotal}
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
                        Rs.{packageData.total}
                      </span>
                    </div>
                  </div>
                </Fade>
              </>
            )}

            {/* Button group for navigating back or proceeding to checkout */}
            <Fade right duration={1000} distance="50px">
              <div className="button-group">
                <Link className="main-btn  back-btn" to="/cutting">
                  Back
                </Link>
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
export default CuttingOnly;
