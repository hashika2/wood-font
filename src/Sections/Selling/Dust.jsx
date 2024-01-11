import React, { useState } from "react";
import SellinCheckout from "./SellinCheckout";
import { Fade } from "react-reveal";
function Dust({ error, success }) {
  const [dust, setDust] = useState({
    qty: 0,
    total: 0,
    selling_type: "dust",
  });

  const CalculateQty = (value) => {
    let quantity = parseInt(value);
    let amount = 0;
    amount = 1000 * quantity;

    setDust({
      ...dust,
      quantity: quantity,
      total: amount,
    });

    // setErrors({
    //   ...errors,
    //   quantity: "",
    // });
  };
  const [CheckoutData, setCheckoutData] = useState(null);
  //   edit wood modal configurations
  const [CheckoutShow, setCheckoutShow] = useState(false);
  const CheckoutClose = () => {
    setCheckoutShow(false);
    setCheckoutData(null);
  };
  const ChckoutModalShow = () => setCheckoutShow(true);

  const checkOut = () => {
    if (dust.total !== 0) {
      setCheckoutData(dust);
      ChckoutModalShow();
    }else {
        error("Please Add Quantity")
      }
  };
  return (
    <>
      <Fade bottom duration={1000} distance="20px">
        <div className="selling-detail-box-title">
          <span>Dust</span>
        </div>
      </Fade>
      <Fade bottom duration={1000} distance="20px">
        <div className="selling-detail-item dust-selling">
          <div className="dust-input">
            <div className="input-row">
              <span className="input-title">Quantity</span>
              <input
                type="text"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*\.?\d*$/.test(value) || value === "") {
                    CalculateQty(value);
                  }
                }}
              />
            </div>

            <div className="input-row">
              <span className="input-title">Total</span>
              <label>Rs.{dust.total}.00</label>
            </div>
          </div>
        </div>
      </Fade>

      <Fade bottom duration={1000} distance="20px">
        <div className="selling-detail-add-group">
          <div className="dust-total"></div>

          <button className="main-btn " onClick={() => checkOut()}>
            Proceed To Checkout
          </button>
        </div>
      </Fade>

      {CheckoutData && (
        <SellinCheckout
          show={CheckoutShow}
          data={CheckoutData}
          CheckoutClose={CheckoutClose}
        />
      )}
    </>
  );
}

export default Dust;
