import React from "react";
import Header from "../../Layout/Header";
import bed from "./../../assets/img/bed.jpg";
import { Fade } from "react-reveal";
function Products() {
  return (
    <>
      <Header />

      <section className="page-container selling-container">
        <div className="title-section">
          <span>Products</span>
        </div>
        <div className="detail-box product-box">
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
        </div>
      </section>
    </>
  );
}

export default Products;
