import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import { Fade } from "react-reveal";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../Layout/Header";
function CheckOut({ ChangeStep }) {
  const navigate = useNavigate();
  const location = useLocation();
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

  const [checkForm, setCheckForm] = useState({
    name: "",
    NIC: "",
    address: "",
    contact_no: "",
    email: "",
  });

  useEffect(() => {
    let formData = JSON.parse(localStorage.getItem("package"));
    setCheckForm({
      ...checkForm,
      type_name: formData.type_name,
      cutting_type: formData.cutting_type,
      type: formData.type,
      circumference: formData.circumference,
      height: formData.height,
      distance: formData.distance,
      subtotal: formData.subtotal,
      transportFee: formData.transportFee,
      total: formData.total,
      volume: formData.volume,
    });
  }, []);

  const GoBack = () => {
    setCheckForm({
      name: "",
      NIC: "",
      address: "",
      contact_no: "",
      email: "",
      cutting_type: "",
      type: 0,
      circumference: "",
      height: "",
      distance: "",
      subtotal: 0,
      transportFee: 0,
      total: 0,
    });
  };

  const Procceed = () => {
    if (
      checkForm.name &&
      checkForm.NIC &&
      checkForm.contact_no &&
      checkForm.email
    ) {
      const body ={
          name: checkForm.name,
          NIC: checkForm.NIC,
          contact_no: checkForm.contact_no,
          address: checkForm.address,
          email: checkForm.email
      }
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/cutting-order/pay/${location.state.id}`, body)
        .then((res) => {
          localStorage.removeItem("package");
          localStorage.setItem(
            "success",
            "Cutting Order has been added succefully"
          );
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      error("Fill the Inputs");
    }
  };
  const CancelOrder = () => {
    localStorage.removeItem("package");
    navigate("/");
  };

  return (
    <>
      <Header />

      <section className="fixed-image"></section>
      <section className="page-container">
        <div className="detail-box">
          <div className="border-box">
            <Fade right duration={1000} distance="50px">
              <div className="detail-title">Checkout</div>
            </Fade>
            <Fade right duration={1000} distance="50px">
              <div className="checkout-box">
                <div className="page-form ">
                  <div className="des-title">Customer Details</div>
                  <div className="input-row">
                    <span className="input-title">Name</span>
                    <input
                      type="text"
                      onChange={(event) => {
                        setCheckForm({
                          ...checkForm,
                          name: event.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="input-row">
                    <span className="input-title">ID</span>
                    <input
                      type="text"
                      onChange={(event) => {
                        setCheckForm({
                          ...checkForm,
                          NIC: event.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="input-row">
                    <span className="input-title">Address</span>
                    <input
                      type="text"
                      onChange={(event) => {
                        setCheckForm({
                          ...checkForm,
                          address: event.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="input-row">
                    <span className="input-title">Contact No</span>
                    <input
                      type="text"
                      onChange={(event) => {
                        setCheckForm({
                          ...checkForm,
                          contact_no: event.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="input-row">
                    <span className="input-title">Email</span>
                    <input
                      type="text"
                      onChange={(event) => {
                        setCheckForm({
                          ...checkForm,
                          email: event.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="checkout-details">
                  <div className="checkout-detail-title">Order Summary</div>
                  <div className="order-details">
                    <div className="order-details-row">
                      <span className="o-d-title">Tree Type</span>
                      <span className="o-d-dec uppercase">
                        {checkForm.type_name && checkForm.type_name}
                      </span>
                    </div>
                    <div className="order-details-row">
                      <span className="o-d-title">Volume</span>
                      <span className="o-d-dec ">
                        {checkForm.volume && checkForm.volume} ft<sup>3</sup>
                      </span>
                    </div>
                    <div className="order-details-row">
                      <span className="o-d-title">Sub Total</span>
                      <span className="o-d-dec">
                        Rs. {checkForm.subtotal && checkForm.subtotal}
                       
                      </span>
                    </div>
                    <div className="order-details-row">
                      <span className="o-d-title">Total</span>
                      <span className="o-d-dec">
                        Rs. {checkForm.total && checkForm.total}
                       
                      </span>
                    </div>
                    <div className="order-details-row button-column">
                      <button onClick={() => Procceed()}>Procced To Pay</button>
                      <button onClick={() => CancelOrder()}>
                        {" "}
                        Cancel Order
                      </button>
                    </div>
                  </div>
                </div>
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

export default CheckOut;
