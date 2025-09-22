import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./AddItemForm.css";

export function AddItemForm({ onSave, onClose }) {
  //Raw form data
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    unit: "шт",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "", //clear specific field error
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Must be greater than 0";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const productData = {
      name: formData.name,
      unit: formData.unit === "шт" ? formData.amount : null,
      grams: formData.unit === "г" ? Number(formData.amount) : null,
    };

    onSave(productData);
    // Reset form
    setFormData({
      name: "",
      amount: "",
      unit: "шт",
    });
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className={`title-input ${errors.name ? "error" : ""}`}
          placeholder="Product name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="amount-container">
        <div className="form-group">
          <input
            type="number"
            className={`amount-input ${errors.amount ? "error" : ""}`}
            placeholder="0"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            min="0"
          />
          {errors.amount && (
            <span className="error-message">{errors.amount}</span>
          )}
        </div>

        <select
          className="amount-unit-select"
          name="unit"
          value={formData.unit}
          onChange={handleInputChange}
        >
          <option value="шт">шт</option>
          <option value="г">г</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="add-button">
          Save
        </button>
      </div>
      <FaTimes className="cancel-button icon" onClick={onClose}/>

    </form>
  );
}
