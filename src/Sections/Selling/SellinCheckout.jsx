import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
function SellinCheckout({ show, CheckoutClose, data }) {
  const navigate = useNavigate();
  const CloseModal = () => {
    CheckoutClose();
  };

  const [checkForm, setCheckForm] = useState({
    name: "",
    NIC: "",
    address: "",
    contact_no: "",
    email: "",
    transport: 0,
    distance: 0,
    items: data.items,
    subtotal: data.total,
    total: data.total,
    type: data.selling_type,
    qty: data.qty,
  });

  useEffect(() => {
    let transport = 0;
    if (checkForm.type === "dust" && checkForm.distance !== 0) {
      let extra_distance = checkForm.distance - 1;
      transport = 1000 + extra_distance * 200;
    } else {
      transport = 1000 * checkForm.distance;
    }

    let totalAmount = checkForm.subtotal + transport;
    setCheckForm({
      ...checkForm,
      transport: transport,
      total: totalAmount,
    });
  }, [checkForm.distance]);

  console.log(data);

  const Procceed = () => {
    if (
      checkForm.name &&
      checkForm.NIC &&
      checkForm.contact_no &&
      checkForm.email
    ) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/cutting-order`, checkForm)
        .then((res) => {
          localStorage.setItem(
            "success",
            "Cutting OrderSelling Order has been added succefully"
          );
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };

  const CancelOrder = () => {
    setCheckForm({});
    navigate("/");
  };
  return (
    <>
      <Modal show={show} onHide={CloseModal} dialogClassName="app-modal">
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="modal-form">
            <div className="modal-form-item">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                onChange={(event) => {
                  setCheckForm({
                    ...checkForm,
                    name: event.target.value,
                  });
                }}
              />
            </div>
            <div className="modal-form-item">
              <label htmlFor="Name">NIC</label>
              <input
                type="text"
                onChange={(event) => {
                  setCheckForm({
                    ...checkForm,
                    NIC: event.target.value,
                  });
                }}
              />
            </div>
            <div className="modal-form-item">
              <label htmlFor="Address">Address</label>
              <input
                type="text"
                onChange={(event) => {
                  setCheckForm({
                    ...checkForm,
                    address: event.target.value,
                  });
                }}
              />
            </div>
            <div className="modal-form-item">
              <label htmlFor="Contact_No">Contact No</label>
              <input
                type="text"
                onChange={(event) => {
                  setCheckForm({
                    ...checkForm,
                    contact_no: event.target.value,
                  });
                }}
              />
            </div>
            <div className="modal-form-item">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                onChange={(event) => {
                  setCheckForm({
                    ...checkForm,
                    email: event.target.value,
                  });
                }}
              />
            </div>
            <div className="modal-form-item">
              <label htmlFor="distance">Distance</label>
              <input
                type="text"
                onChange={(event) => {
                  setCheckForm({
                    ...checkForm,
                    distance: event.target.value,
                  });
                }}
              />
            </div>
            <div className="modal-form-item">
              <div className="summary">
                <div className="summary-title">Order Summary</div>
                <div className="summary-detail">
                  <div className="d-item">Type</div>
                  <div className="d-right">{checkForm.type}</div>
                </div>
                <div className="summary-detail">
                  <div className="d-item">Sub Total</div>
                  <div className="d-right">Rs.{checkForm.subtotal}.00</div>
                </div>
                <div className="summary-detail">
                  <div className="d-item">Transport</div>
                  <div className="d-right">Rs.{checkForm.transport}.00</div>
                </div>
                <div className="summary-detail">
                  <div className="d-item">Total</div>
                  <div className="d-right">Rs.{checkForm.total}.00</div>
                </div>
              </div>
            </div>
            <div className="modal-button">
              <button className="app-btn btn-primary">Proceed To pay</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SellinCheckout;
