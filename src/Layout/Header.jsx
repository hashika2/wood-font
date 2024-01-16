import React from "react";
import logo from "./../assets/img/logo.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <section className="header">
        <Link to="/" className="logo">
          <img src={logo} alt="" />
        </Link>
        <div className="navigation-bar">
          <div className="navigation-group">
            <div className="navigation-item">
            <Link to="/home" style={{textDecoration: 'none', color: 'black'}}>Home</Link>
            </div>
            <div className="navigation-item">
              <span>Services</span>
            </div>
            <div className="navigation-item">
              <span>Carpenters</span>
            </div>
            <div className="navigation-item">
              <span>About Us</span>
            </div>
            <div className="navigation-item">
              <Link to="/contact" style={{textDecoration: 'none', color: 'black'}}>Contact Us</Link>
            </div>
          </div>

          <div className="user">
            <AccountCircleOutlinedIcon sx={{ fontSize: 30 }} color="#000" />
          </div>
          <div className="user">
          <Link to="/products/checkout" style={{textDecoration: 'none', color: 'black'}}><ShoppingCartIcon sx={{ fontSize: 30 }} color="#000" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
