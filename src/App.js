import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/selling.css";
import "./assets/css/modal.css";
import "./assets/css/products.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Slide } from "react-toastify";

import FullPackage from "./Sections/Cutting/FullPackage";
import CheckOut from "./Sections/Cutting/CheckOut";
import CuttingOnly from "./Sections/Cutting/CuttingOnly";
import Cutting from "./Sections/Cutting/Cutting";
import Selling from "./Sections/Selling/Selling";
import Products from "./Sections/Products/Products";
import Buying from "./Sections/Buying/Buying";
import Login from "./Sections/Login";
import Register from "./Sections/Register";
import Contact from "./Sections/Contact";
import BuyingCheckout from "./Sections/Buying/BuyingCheckout";
import ProductCheckout from "./Sections/Products/ProductsCheckout";
import Cart from "./Sections/Products/Cart";
import PostProduct from "./Sections/Products/PostProduct";
function App() {
  return (
    <div className="App">
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
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cutting" element={<Cutting />} />
        <Route path="/cutting/full-package" element={<FullPackage />} />
        <Route path="/cutting/cutting-only" element={<CuttingOnly />} />
        <Route path="/cutting/checkout" element={<CheckOut />} />

        <Route path="/selling" element={<Selling />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/checkout" element={<ProductCheckout />} />
        <Route path="/buying" element={<Buying />} />
        <Route path="/buying/checkout" element={<BuyingCheckout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/product" element={<PostProduct />} />
      </Routes>
    </div>
  );
}

export default App;
