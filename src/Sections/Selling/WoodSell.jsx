import React, { useEffect, useState } from "react";
import AddWoodModal from "./AddWoodModal";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import EditWoodModal from "./EditWoodModal";
import SellinCheckout from "./SellinCheckout";
import { Fade } from "react-reveal";

function WoodSell({ error, success}) {

  //   add wood modal configurations
  const [woodShow, setWoodShow] = useState(false);
  const AddWoodModalClose = () => setWoodShow(false);
  const AddWoodModalShow = () => setWoodShow(true);
  //   end of add wood modal configurations

  const [editData, setEditData] = useState(null);
  //   edit wood modal configurations
  const [woodEditShow, setWoodEditShow] = useState(false);
  const EditWoodModalClose = () => {
    setWoodEditShow(false);
    setEditData(null);
  };
  const EditWoodModalShow = () => setWoodEditShow(true);
  //   end of edit wood modal configurations

  const [CheckoutData, setCheckoutData] = useState(null);
  //   edit wood modal configurations
  const [CheckoutShow, setCheckoutShow] = useState(false);
  const CheckoutClose = () => {
    setCheckoutShow(false);
    setCheckoutData(null);
  };
  const ChckoutModalShow = () => setCheckoutShow(true);
  //   end of edit wood modal configurations
  const [woodItems, setWooditems] = useState([]);

  const [orderDetails, setorderDetails] = useState({
    selling_type: "wood",
  });

  const AddWood = (item) => {
    if (item) {
      setWooditems([...woodItems, item]);
    }
  };

  const editWood = (data) => {
    setEditData(data);
    EditWoodModalShow();
  };

 

  const UpdateWood = (item) => {
    const updatedArray = woodItems.map((data) => {
      if (data.id === item.id) {
        return item;
      }
      return data;
    });
    setWooditems(updatedArray);
  };

  const RemoveWood = (item) => {
    const deleteArray = woodItems.filter((data) => !(data.id === item.id));
    setWooditems(deleteArray);
  };
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const checkTotal = () => {
      let amount = 0;
      woodItems.forEach((item) => {
        amount += item.total;
      });
      setTotal(amount);

      setorderDetails({
        ...orderDetails,
        total: amount,
        items: woodItems,
      });
    };
    checkTotal();
  }, [woodItems]);

  const checkOut = () => {
    if (orderDetails.items.length > 0) {
      setCheckoutData(orderDetails);
      ChckoutModalShow();
    } else {
      error("Please Add Woods")
    }
  };
  return (
    <>
      <Fade bottom duration={1000} distance="20px">
        <div className="selling-detail-box-title">
          <span>Wood</span>
          <button className="main-btn checkout-btn" onClick={AddWoodModalShow}>
            Add Wood
          </button>
        </div>
      </Fade>

      {woodItems.length > 0 ? (
        woodItems.map((item) => {
          return (
            <Fade bottom duration={1000} distance="20px">
              <div className="selling-detail-item">
                <div className="selling-detail-content">
                  <div className="content-row">
                    <span className="content-title">Wood </span> <span>:</span>{" "}
                    <span className="content-des">{item.name} </span>
                  </div>
                  <div className="content-row">
                    <span className="content-title">Type </span> <span>:</span>{" "}
                    <span className="content-des">
                      {item.type}{" "}
                      {item.size_type && <span>- {item.size_type}</span>}
                    </span>
                  </div>
                  <div className="content-row">
                    <span className="content-title">Quantity </span>{" "}
                    <span>:</span>{" "}
                    <span className="content-des">{item.quantity}</span>
                  </div>
                </div>
                <div className="actions">
                  <span onClick={() => editWood(item)}>
                    <EditIcon sx={{ fontSize: 25 }} color="#000" />
                  </span>
                  <span onClick={() => RemoveWood(item)}>
                    <CloseIcon sx={{ fontSize: 25 }} color="#000" />
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
            <span className="add-item-title">Add Wood</span>
          </div>
        </Fade>
      )}

      <Fade bottom duration={1000} distance="20px">
        <div className="selling-detail-add-group">
          <div className="check-total">
            <span className="c-total">Total</span>
            <span className="c-amount">Rs.{total}.00</span>
          </div>

          <button className="main-btn " onClick={() => checkOut(woodItems)}>
            Proceed To Checkout
          </button>
        </div>
      </Fade>

      <AddWoodModal
        show={woodShow}
        AddWood={AddWood}
        AddWoodModalClose={AddWoodModalClose}
      />
      {CheckoutData && (
        <SellinCheckout
          show={CheckoutShow}
          data={CheckoutData}
          AddWood={AddWood}
          CheckoutClose={CheckoutClose}
        />
      )}

      {editData && (
        <EditWoodModal
          show={woodEditShow}
          UpdateWood={UpdateWood}
          data={editData}
          EditWoodModalClose={EditWoodModalClose}
        />
      )}

    
    </>
  );
}

export default WoodSell;
