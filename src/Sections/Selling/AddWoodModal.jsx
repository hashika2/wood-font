import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function AddWoodModal({ show, AddWoodModalClose, AddWood }) {
  const [woods, setWoods] = useState([]);

  useEffect(() => {
    const getWoods = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/wood-types`)
        .then((res) => {
          setWoods(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getWoods();
  }, []);

  const [woodOrderitem, setWoodOrderItem] = useState({
    quantity: "",
  });
  const [wood, setWood] = useState({});

  // State to store validation errors
  const [errors, setErrors] = useState({});

  const SelectWood = (value) => {
    const selectedWood = woods.find((wood) => wood._id === value);

    if (selectedWood) {
      setWood(selectedWood);
      setWoodOrderItem({
        ...woodOrderitem,
        id: selectedWood._id,
        name: selectedWood.name,
      });
      setErrors({
        ...errors,
        wood: "",
      });
    } else {
      setWood({});
      setWoodOrderItem({});
    }
  };

  useEffect(() => {
    const AdjustOrderItem = () => {
      setWoodOrderItem({
        ...woodOrderitem,
        size: 0,
        size_type: "",
        price: 0,
        amount: 0,
        quantity: "",
      });
    };

    AdjustOrderItem();
  }, [woodOrderitem.type]);

  const SelectSize = (value) => {
    const size = wood.wood_size.find((s) => s._id === value);

    if (size) {
      setWoodOrderItem({
        ...woodOrderitem,
        size: size.id,
        size_type: size.size,
        price: size.price,
      });
    }
  };

  const CalculateQty = (value) => {
    let quantity = parseInt(value);
    let amount = 0;
    switch (woodOrderitem.type) {
      case "planks":
        amount = wood.planks_price * quantity;
        break;
      case "regal":
        amount = wood.regal_price * quantity;
        break;
      case "sizes":
        amount = quantity * woodOrderitem.price;
        break;
      default:
        break;
    }

    setWoodOrderItem({
      ...woodOrderitem,
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

      total = woodOrderitem.amount;

      setWoodOrderItem({
        ...woodOrderitem,
        total: total,
      });
    };
    CalculateTotal();
  }, [woodOrderitem.amount]);

  const CloseModal = () => {
    setWoodOrderItem({});
    setWood({});
    AddWoodModalClose();
  };

  // Function to validate form data
  const validate = (data) => {
    console.log('ddddddddddd',  data)
    const errors = {};
    if (!data.id) {
      errors.wood = "Select the Wood";
    }
    if (!data.type) {
      errors.type = "Select the Type";
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
    const validationErrors = validate(woodOrderitem);
    setErrors(validationErrors);

    // If there are no errors, make the API call to add the expense
    if (Object.keys(validationErrors).length === 0) {
      AddWood(woodOrderitem);
      AddWoodModalClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={CloseModal} dialogClassName="app-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Wood</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="modal-form" onSubmit={AddItemSubmit}>
            <div className="modal-form-item">
              <label htmlFor="wood_type">Wood Type</label>
              <select
                name="wood_type"
                id="wood_type"
                className="modal-form-select"
                onChange={(e) => SelectWood(e.target.value)}
              >
                <option value="">Select Type</option>
                {woods.map((wood, woodIndex) => {
                  return (
                    <>
                      <option value={wood._id} key={woodIndex}>
                        {wood.name}
                      </option>
                    </>
                  );
                })}
              </select>
              {errors.wood && <span className="form-error">{errors.wood}</span>}
            </div>
            {Object.keys(wood).length > 0 && (
              <>
                <div className="modal-form-item">
                  <label htmlFor="wood_type">Product Type</label>
                  <select
                    name="wood_type"
                    id="wood_type"
                    className="modal-form-select"
                    onChange={(e) => {
                      setWoodOrderItem({
                        ...woodOrderitem,
                        type: e.target.value,
                      });
                      setErrors({
                        ...errors,
                        type: "",
                      });
                    }}
                  >
                    <option value="">Select Product Type</option>
                    {wood.planks_price !== null && (
                      <option value="planks">planks</option>
                    )}
                    {wood.regal_price !== null && (
                      <option value="regal">regal</option>
                    )}
                    {wood.wood_size.length > 0 && (
                      <option value="sizes">sizes</option>
                    )}
                  </select>
                  {errors.type && (
                    <span className="form-error">{errors.type}</span>
                  )}
                </div>

                {(woodOrderitem.type === "planks" ||
                  woodOrderitem.type === "regal") && (
                  <div className="modal-form-item">
                    <label htmlFor="Quntity">
                      Quantity{" "}
                      {woodOrderitem.type === "planks" ? (
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
                )}
                {woodOrderitem.type === "sizes" && (
                  <>
                    <div className="modal-form-item">
                      <label htmlFor="wood_type">Wood Size</label>
                      <select
                        name="wood_type"
                        id="wood_type"
                        className="modal-form-select"
                        onChange={(e) => SelectSize(e.target.value)}
                      >
                        <option value="">Select Size</option>
                        {wood.wood_size.map((size, sizeIndex) => {
                          return (
                            <option value={size._id} key={sizeIndex}>
                              {size.size} - (1ft) - {size.price.toFixed(2)}
                            </option>
                          );
                        })}
                      </select>
                    </div>
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
                  </>
                )}

                <div className="modal-form-item show-only m-t-50">
                  <span className="label-span span-left">Total </span>
                  <span className="label-span span-right">
                    Rs.{woodOrderitem.total ? woodOrderitem.total : "000.00"}{" "}
                  </span>
                </div>
              </>
            )}

            <div className="modal-button">
              <button className="app-btn btn-primary">Add Wood</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddWoodModal;
