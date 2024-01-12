import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function AddFireWoodModal({ show, AddFireWoodModalClose, AddFireWood }) {
  const [FireWoods, setFireWoods] = useState([]);

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

  const [FireWoodOrderitem, setFireWoodOrderItem] = useState({
    quantity: "",
  });
  const [FireWood, setFireWood] = useState({});

  // State to store validation errors
  const [errors, setErrors] = useState({});

  const SelectFireWood = (value) => {
    const selectedFireWood = FireWoods.find(
      (FireWood) => FireWood._id === value
    );

    if (selectedFireWood) {
      setFireWood(selectedFireWood);
      setFireWoodOrderItem({
        ...FireWoodOrderitem,
        id: selectedFireWood._id,
        name: selectedFireWood.name,
      });
      setErrors({
        ...errors,
        FireWood: "",
      });
    } else {
      setFireWood({});
      setFireWoodOrderItem({});
    }
  };

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
    AddFireWoodModalClose();
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
  const AddItemSubmit = async (e) => {
    e.preventDefault();
    // Validate the form data and set the errors
    const validationErrors = validate(FireWoodOrderitem);
    setErrors(validationErrors);

    // If there are no errors, make the API call to add the expense
    if (Object.keys(validationErrors).length === 0) {
      AddFireWood(FireWoodOrderitem);
      AddFireWoodModalClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={CloseModal} dialogClassName="app-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add FireWood</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="modal-form" onSubmit={AddItemSubmit}>
            <div className="modal-form-item">
              <label htmlFor="FireWood_type">FireWood Type</label>
              <select
                name="FireWood_type"
                id="FireWood_type"
                className="modal-form-select"
                onChange={(e) => SelectFireWood(e.target.value)}
              >
                <option value="">Select Type</option>
                {FireWoods.map((FireWood, FireWoodIndex) => {
                  return (
                    <>
                      <option value={FireWood._id} key={FireWoodIndex}>
                        {FireWood.name}
                      </option>
                    </>
                  );
                })}
              </select>
              {errors.FireWood && (
                <span className="form-error">{errors.FireWood}</span>
              )}
            </div>
            {Object.keys(FireWood).length > 0 && (
              <>
                <div className="modal-form-item">
                  <label htmlFor="Quntity">
                    Quantity <span>(ft)</span>
                  </label>
                  <input
                    type="text"
                    id="Quntity"
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
              <button className="app-btn btn-primary">Add FireWood</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddFireWoodModal;
