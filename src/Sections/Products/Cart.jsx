import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import { Fade } from "react-reveal";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../Layout/Header";
function Cart({ ChangeStep }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItem, setCartItem] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
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
    let items = JSON.parse(localStorage.getItem("cartItem"));
    setCartItem(items)
    const total = calculateTotal(items)
    setTotalPrice(total)
  }, []);

  const calculateTotal = (items) => {
    let total = 0
    items?.map(item => {
        total = total + item.price
    })
    return total
  }

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
        const body = {
          customer: {
            name: checkForm.name,
            NIC: checkForm.NIC,
            contact_no: checkForm.contact_no,
            address: checkForm.address,
            email: checkForm.email
          },
          orderDetails: {
            cart_item: cartItem,
            total: totalPrice
          }
        }
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/product/pay`, body)
          .then((res) => {
            localStorage.setItem(
              "success",
              "CartItem has been added succefully"
            );
            localStorage.removeItem("cartItem");
            navigate("/home");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
      }
  };
  const CancelOrder = () => {
    localStorage.removeItem("cartItem");
    navigate("/home");
  };

  return (
    <>
      <Header />

      <section className="fixed-image"></section>
      <section className="page-container">
        <div className="product_checkout_detail-box">
          <div className="border-box">
            <Fade right duration={1000} distance="50px">
              <div className="detail-title">Cart</div>
            </Fade>
            <Fade right duration={1000} distance="50px">
              <div className="checkout-box">
                <div className="checkout-details" style={{width: "100%" , padding: '10%'}}>
                  <div className="checkout-detail-title">Order Summary</div>
                  <div className="order-details">
                    {cartItem?.map(item => {
                        return(
                        <div className="order-details-row">
                        <div className="lg-mr">
                        <span className="o-d-title md-mr">Product</span>
                        <span className="o-d-dec uppercase">
                          {item.title}
                        </span>
                        </div>
                        <div className="lg-mr">
                        <span className="o-d-title md-mr">Price</span>
                        <span className="o-d-dec">
                         Rs. {item.price}
                        </span>
                        </div>
                       
                        
                      </div>)
                    })}
                    <div className="order-details-row">
                      
                    </div>
                    <div className="order-details-row">
                      <span className="o-d-title">Total</span>
                      <span className="o-d-dec">
                        Rs. {totalPrice}
                       
                      </span>
                    </div>
                    <div className="order-details-row button-column">
                      <button onClick={() => Procceed()}>Checkout To Pay</button>
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

export default Cart;
