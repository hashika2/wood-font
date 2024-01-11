import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function EditFireWoodModal({
  show,
  data,
  EditFireWoodModalClose,
  UpdateFireWood,
}) {
  const [FireWoods, setFireWoods] = useState([]);
  const [FireWoodOrderitem, setFireWoodOrderItem] = useState({});
  const [FireWood, setFireWood] = useState({});

  useEffect(() => {
    const getFireWoods = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/wood-types`)
        .then((res) => {
          setFireWoods(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getFireWoods();
  }, []);
  useEffect(() => {
    const setData = () => {
      setFireWoodOrderItem({
        type: data.type,
        id: data.id,
        name: data.name,
        price: data.price,
        amount: data.amount,
        total: data.total,
        quantity: data.quantity,
      });

      const selectedFireWood = FireWoods.find(
        (FireWood) => FireWood.id === data.id
      );
      setFireWood(selectedFireWood || {}); // Make sure to set default value as an empty object if selectedFireWood is undefined
    };

    setData();
  }, [FireWoods, data]);

  console.log(FireWoodOrderitem);

  // State to store validation errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const AdjustOrderItem = () => {
      setFireWoodOrderItem({
        ...FireWoodOrderitem,
        price: 0,
        amount: 0,
        quantity: "",
      });
    };

    AdjustOrderItem();
  }, [FireWoodOrderitem.type]);

  const CalculateQty = (value) => {
    if (value) {
      let quantity = parseInt(value);
      let amount = 0;
      amount = FireWood.fire_wood * quantity;

      setFireWoodOrderItem({
        ...FireWoodOrderitem,
        amount: amount,
        quantity: quantity,
      });

      setErrors({
        ...errors,
        quantity: "",
      });
    } else {
      setFireWoodOrderItem({
        ...FireWoodOrderitem,
        amount: 0,
        quantity: "",
      });
    }
  };

  useEffect(() => {
    const CalculateTotal = () => {
      let total = 0;

      total = FireWoodOrderitem.amount;

      setFireWoodOrderItem({
        ...FireWoodOrderitem,
        total: total,
      });
    };
    CalculateTotal();
  }, [FireWoodOrderitem.amount]);

  const CloseModal = () => {
    setFireWoodOrderItem({});
    setFireWood({});
    EditFireWoodModalClose();
  };

  // Function to validate form data
  const validate = (data) => {
    const errors = {};
    if (!data.id) {
      errors.FireWood = "Select the FireWood";
    }
    if (!data.quantity) {
      errors.quantity = "Add Quantity";
    }

    return errors;
  };

  // Function to handle the form submission
  const EditItemSubmit = async (e) => {
    e.preventDefault();
    // Validate the form data and set the errors
    const validationErrors = validate(FireWoodOrderitem);
    setErrors(validationErrors);

    // If there are no errors, make the API call to add the expense
    if (Object.keys(validationErrors).length === 0) {
      UpdateFireWood(FireWoodOrderitem);
      EditFireWoodModalClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={CloseModal} dialogClassName="app-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit FireWood</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="modal-form" onSubmit={EditItemSubmit}>
            {FireWood && Object.keys(FireWood).length > 0 && (
              <>
                <div className="modal-form-item">
                  <label htmlFor="Quntity">
                    Quantity{" "}
                    {FireWoodOrderitem.type === "planks" ? (
                      <span>
                        (ft<sup>3</sup>)
                      </span>
                    ) : (
                      <span>(ft)</span>
                    )}{" "}
                  </label>
                  <input
                    type="text"
                    id="Quntity"
                    value={FireWoodOrderitem.quantity}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value) || value === "") {
                        CalculateQty(value);
                      }
                    }}
                    className="modal-form-input"
                  />
                  {errors.quantity && (
                    <span className="form-error">{errors.quantity}</span>
                  )}
                </div>

                <div className="modal-form-item show-only m-t-50">
                  <span className="label-span span-left">Total </span>
                  <span className="label-span span-right">
                    Rs.
                    {FireWoodOrderitem.total
                      ? FireWoodOrderitem.total
                      : "000.00"}{" "}
                  </span>
                </div>
              </>
            )}

            <div className="modal-button">
              <button className="main-btn btn-primary">Edit FireWood</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default EditFireWoodModal;
