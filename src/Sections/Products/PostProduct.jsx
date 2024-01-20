import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import Header from "../../Layout/Header";
import { Link, useNavigate } from "react-router-dom";
import { Fade } from "react-reveal";
import defaulImage  from "../../assets/img/empty.png"

function PostProduct({ ChangeStep, setPath }) {
  const navigate = useNavigate();

  const [types, setTypes] = useState([]);
  const [image, setImage] = useState("");
  const [productData, setProducreData] = useState({
   image_url: "",
   title: "",
   price: ""
  });

  useEffect(() => {
    const getTypes = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/tree-types`)
        .then((res) => {
          setTypes(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getTypes();
  }, []);

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    if (file?.size > 200000) {
      toast.error(`Image size exceeded the limit of 200 KB`);
      return;
    }
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setImage(reader.result);
    }.bind(this);
    setImage(event.target.files[0]);
  };

 const onSubmit = async () => {
    try {
      const body = {
        ...productData,
        image_url: image,
      }
      if(!image || !productData.price || !productData.title){
        toast.error(`All field must be required`);
      }
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/product`, body)
      navigate("/home" );
      toast.success("Product has been added");
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data);
    }
 }

  return (
    <>
      <Header />
      <section className="fixed-image"></section>
      <section className="page-container">
        <div className="detail-box">
          <div className="border-box">
            <Fade right duration={1000} distance="50px">
              <div className="detail-title">Add Product</div>
            </Fade>
            <div className="des-title"></div>
            <Fade right duration={1000} distance="50px">
              <div className="page-form">
                <div style={{textAlign:"center"}}>
                <div>
                      <img
                        alt="abc"
                        width="100%"
                        src={image ? image : defaulImage}
                        style={{
                          width: 100,
                          height: 100,
                          margin: "auto",
                          display: "block",
                          maxWidth: "100%",
                          maxHeight: "100%",
                          paddingBottom: "10px",
                          borderRadius: "20%",
                        }}
                      />
                    </div>
                    <label style={{color:"white", cursor: "pointer"}}  className="main-btn  back-btn">
                        Select Image
                        <input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleUploadClick}
                        />
                    </label>
                </div>
                <div className="input-row">
                  <span className="input-title">Name </span>
                    <input
                      type="text"
                      value={productData.title}
                      onChange={(e) => {
                        const value = e.target.value;
                        setProducreData({
                          ...productData,
                          title: value,
                        });
                      }}
                    />
                </div>
                <div className="input-row">
                  <span className="input-title">Price</span>
                  <input
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value) || value === "") {
                        setProducreData({
                          ...productData,
                          price: value,
                        });
                      }
                    }}
                    value={productData.price}
                  />
                </div>
              </div>
            </Fade>
            <Fade right duration={1000} distance="50px">
              <div className="button-group">
                <Link className="main-btn  back-btn" to="/home">
                  Back
                </Link>
                <button
                  className="main-btn  checkout-btn"
                  onClick={() => onSubmit()}
                >
                  Save
                </button>
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

export default PostProduct;
