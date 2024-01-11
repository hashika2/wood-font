import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SellinCheckout from "./SellinCheckout";
import EditFireWoodModal from "./EditFireWoodModal";
import AddFireWoodModal from "./AddFireWoodModal";
import { Fade } from "react-reveal";
function FireWood({ error, success}) {
  //   add wood modal configurations
  const [FireWoodShow, setFireWoodShow] = useState(false);
  const AddFireWoodModalClose = () => setFireWoodShow(false);
  const AddFireWoodModalShow = () => setFireWoodShow(true);
  //   end of add FireWood modal configurations

  const [editData, setEditData] = useState(null);
  //   edit FireWood modal configurations
  const [FireWoodEditShow, setFireWoodEditShow] = useState(false);
  const EditFireWoodModalClose = () => {
    setFireWoodEditShow(false);
    setEditData(null);
  };
  const EditFireWoodModalShow = () => setFireWoodEditShow(true);
  //   end of edit FireWood modal configurations

  const [CheckoutData, setCheckoutData] = useState(null);
  //   edit FireWood modal configurations
  const [CheckoutShow, setCheckoutShow] = useState(false);
  const CheckoutClose = () => {
    setCheckoutShow(false);
    setCheckoutData(null);
  };
  const ChckoutModalShow = () => setCheckoutShow(true);
  //   end of edit FireWood modal configurations
  const [FireWoodItems, setFireWooditems] = useState([]);

  const [orderDetails, setorderDetails] = useState({
    selling_type: "fire_wood",
  });

  const AddFireWood = (item) => {
    if (item) {
      setFireWooditems([...FireWoodItems, item]);
    }
  };

  const editFireWood = (data) => {
    setEditData(data);
    EditFireWoodModalShow();
  };

  const checkOut = () => {
    if (orderDetails.items.length > 0) {
      setCheckoutData(orderDetails);
      ChckoutModalShow();
    }else {
      error("Please Add Firewoods")
    }
  };

  const UpdateFireWood = (item) => {
    const updatedArray = FireWoodItems.map((data) => {
      if (data.id === item.id) {
        return item;
      }
      return data;
    });
    setFireWooditems(updatedArray);
  };

  const RemoveFireWood = (item) => {
    const deleteArray = FireWoodItems.filter((data) => !(data.id === item.id));
    setFireWooditems(deleteArray);
  };
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const checkTotal = () => {
      let amount = 0;
      FireWoodItems.forEach((item) => {
        amount += item.total;
      });
      setTotal(amount);

      setorderDetails({
        ...orderDetails,
        total: amount,
        items: FireWoodItems,
      });
    };
    checkTotal();
  }, [FireWoodItems]);
  return (
    <>
      <Fade bottom duration={1000} distance="20px">
        <div className="selling-detail-box-title">
          <span>FireWood</span>
          <button
            className="main-btn checkout-btn"
            onClick={AddFireWoodModalShow}
          >
            Add FireWood
          </button>
        </div>
      </Fade>
      {FireWoodItems.length > 0 ? (
        FireWoodItems.map((item) => {
          return (
            <Fade bottom duration={1000} distance="20px">
              <div className="selling-detail-item">
                <div className="selling-detail-content">
                  <div className="content-row">
                    <span className="content-title">FireWood </span>{" "}
                    <span>:</span>{" "}
                    <span className="content-des">{item.name} </span>
                  </div>

                  <div className="content-row">
                    <span className="content-title">Quantity </span>{" "}
                    <span>:</span>{" "}
                    <span className="content-des">{item.quantity}</span>
                  </div>
                </div>
                <div className="actions">
                  <span onClick={() => editFireWood(item)}>
                    <EditIcon sx={{ fontSize: 20 }} color="#000" />
                  </span>
                  <span onClick={() => RemoveFireWood(item)}>
                    <CloseIcon sx={{ fontSize: 20 }} color="#000" />
                  </span>
                </div>
                <div className="item-total">
                  <span>Rs.{item.total}.00</span>
                </div>
              </div>
            </Fade>
          );
        })
      ) : (
        <Fade bottom duration={1000} distance="20px">
          <div className="selling-detail-item empty-box">
            <span className="add-item-title">Add FireWood</span>
          </div>
        </Fade>
      )}

      <Fade bottom duration={1000} distance="20px">
        <div className="selling-detail-add-group">
          <div className="check-total">
            <span className="c-total">Total</span>
            <span className="c-amount">Rs.{total}.00</span>
          </div>

          <button className="main-btn " onClick={() => checkOut(FireWoodItems)}>
            Proceed To Checkout
          </button>
        </div>
      </Fade>

      <AddFireWoodModal
        show={FireWoodShow}
        AddFireWood={AddFireWood}
        AddFireWoodModalClose={AddFireWoodModalClose}
      />
      {CheckoutData && (
        <SellinCheckout
          show={CheckoutShow}
          data={CheckoutData}
          AddFireWood={AddFireWood}
          CheckoutClose={CheckoutClose}
        />
      )}

      {editData && (
        <EditFireWoodModal
          show={FireWoodEditShow}
          UpdateFireWood={UpdateFireWood}
          data={editData}
          EditFireWoodModalClose={EditFireWoodModalClose}
        />
      )}
    </>
  );
}

export default FireWood;
