import React from 'react'
import mango from "./../assets/img/mango.jpg";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function Choices() {
  return (
    <div className="cutting-choices">
    <div className="choice">
      <div className="choice-image selected-image">
        <img src={mango} alt="" />
        <span className="choice-tick ">
          {" "}
          <CheckCircleOutlineIcon
            sx={{ fontSize: 30, color: "green" }}
            color="#fff"
          />
        </span>
      </div>
      <div className="choice-title">Mango</div>
    </div>
    <div className="choice">
      <div className="choice-image">
        <img src={mango} alt="" />
        <span className="choice-tick ">
          {" "}
          <CheckCircleOutlineIcon
            sx={{ fontSize: 30, color: "green" }}
            color="#fff"
          />
        </span>
      </div>
      <div className="choice-title">Mango</div>
    </div>
    <div className="choice">
      <div className="choice-image">
        <img src={mango} alt="" />
        <span className="choice-tick ">
          {" "}
          <CheckCircleOutlineIcon
            sx={{ fontSize: 30, color: "green" }}
            color="#fff"
          />
        </span>
      </div>
      <div className="choice-title">Mango</div>
    </div>
    <div className="choice">
      <div className="choice-image">
        <img src={mango} alt="" />
        <span className="choice-tick ">
          {" "}
          <CheckCircleOutlineIcon
            sx={{ fontSize: 30, color: "green" }}
            color="#fff"
          />
        </span>
      </div>
      <div className="choice-title">Mango</div>
    </div>
    <div className="choice">
      <div className="choice-image">
        <img src={mango} alt="" />
        <span className="choice-tick ">
          {" "}
          <CheckCircleOutlineIcon
            sx={{ fontSize: 30, color: "green" }}
            color="#fff"
          />
        </span>
      </div>
      <div className="choice-title">Mango</div>
    </div>
    <div className="choice">
      <div className="choice-image">
        <img src={mango} alt="" />
        <span className="choice-tick ">
          {" "}
          <CheckCircleOutlineIcon
            sx={{ fontSize: 30, color: "green" }}
            color="#fff"
          />
        </span>
      </div>
      <div className="choice-title">Mango</div>
    </div>
  </div>
  )
}

export default Choices