import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header";
import bed from "./../../assets/img/bed.jpg";
import { Fade } from "react-reveal";
import { ToastContainer, toast, Slide } from "react-toastify";
function Products() {
  const [cartItems, setCartItems] = useState([])

  const items = [
    { image: bed, title: 'Bedroom', price: 5000 },
    { image: bed, title: 'Bedroom', price: 5000 },
    { image: bed, title: 'Bedroom', price: 5000 },
    { image: bed, title: 'Bedroom', price: 5000 },
    { image: bed, title: 'Bedroom', price: 5000 },
    { image: bed, title: 'Bedroom', price: 5000 }
  ]

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

  const handleCart = (item) => {
    let items = JSON.parse(localStorage.getItem("cartItem"));
    items.push(item)
    localStorage.setItem("cartItem", JSON.stringify(items));
    setCartItems(items)
    success('Add to your cart')
  }
  return (
    <>
      <Header items={cartItems}/>

      <section className="page-container selling-container">
        <div className="title-section">
          <span>Products</span>
        </div>
        <div className="detail-box product-box">
          {
            items?.map((item) => 
              // console.log(item)
              <Fade bottom duration={1000} distance="20px">
                <div className="product">
                  <div className="product-img">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="product-title">{item.title}</div>
                  <div className="product-price">{item.price}</div>
                  <button className="main-btn add-to-cart-btn" onClick={() => handleCart(item)}>Add To Cart</button>
                </div>
              </Fade>
            )
          }
          {/* <Fade bottom duration={1000} distance="20px">
            <div className="product">
              <div className="product-img">
                <img src={bed} alt="" />
              </div>
              <div className="product-title">Bedroom</div>
              <div className="product-price">Rs. 5000.00</div>
              <button className="main-btn add-to-cart-btn">Add To Cart</button>
            </div>
          </Fade>
          <Fade bottom duration={1000} distance="20px">
            <div className="product">
              <div className="product-img">
                <img src={bed} alt="" />
              </div>
              <div className="product-title">Bedroom</div>
              <div className="product-price">Rs. 5000.00</div>
              <button className="main-btn add-to-cart-btn">Add To Cart</button>
            </div>
          </Fade>
          <Fade bottom duration={1000} distance="20px">
            <div className="product">
              <div className="product-img">
                <img src={bed} alt="" />
              </div>
              <div className="product-title">Bedroom</div>
              <div className="product-price">Rs. 5000.00</div>
              <button className="main-btn add-to-cart-btn">Add To Cart</button>
            </div>
          </Fade>
          <Fade bottom duration={1000} distance="20px">
            <div className="product">
              <div className="product-img">
                <img src={bed} alt="" />
              </div>
              <div className="product-title">Bedroom</div>
              <div className="product-price">Rs. 5000.00</div>
              <button className="main-btn add-to-cart-btn">Add To Cart</button>
            </div>
          </Fade>
          <Fade bottom duration={1000} distance="20px">
            <div className="product">
              <div className="product-img">
                <img src={bed} alt="" />
              </div>
              <div className="product-title">Bedroom</div>
              <div className="product-price">Rs. 5000.00</div>
              <button className="main-btn add-to-cart-btn">Add To Cart</button>
            </div>
          </Fade> */}
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

export default Products;
