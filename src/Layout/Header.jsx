import React from "react";
import logo from "./../assets/img/logo.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
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
              <span>Home</span>
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
              <span>Contact Us</span>
            </div>
          </div>

          <div className="user">
            <AccountCircleOutlinedIcon sx={{ fontSize: 30 }} color="#000" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
