import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header";
import bed from "./../../assets/img/bed.jpg";
import { Fade } from "react-reveal";
import { ToastContainer, toast, Slide } from "react-toastify";
import axios from "axios";

function Products() {
  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  },[])

  const fetchProducts = async() => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product`) 
      setProducts(res.data)
    } catch (error) {
      console.log(error)
    }
  }
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
    let items = localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")): [];
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
            products?.map((item) => 
              <Fade bottom duration={1000} distance="20px" key={item._id}>
                <div className="product">
                  <div className="product-img">
                    <img src={item?.image_url} alt="" />
                  </div>
                  <div className="product-title">{item?.title}</div>
                  <div className="product-price">Rs. {item?.price}</div>
                  <button className="main-btn add-to-cart-btn" onClick={() => handleCart(item)}>Add To Cart</button>
                </div>
              </Fade>
            )
          }
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
