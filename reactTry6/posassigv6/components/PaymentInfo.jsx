const PaymentInfo = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number as XXXX XXXX XXXX XXXX
    if (name === "cardNumber") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim().slice(0, 19);
    }
    // Format expiry as MM/YY
    if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})/, "$1/").slice(0, 5);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardName) newErrors.cardName = "Name is required";
    if (formData.cardNumber.replace(/\s/g, "").length !== 16)
      newErrors.cardNumber = "Card number must be 16 digits";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate))
      newErrors.expiryDate = "Expiry must be MM/YY";
    if (!/^\d{3,4}$/.test(formData.cvc)) newErrors.cvc = "CVC must be 3–4 digits";
    if (!formData.amount || Number(formData.amount) <= 0) newErrors.amount = "Enter amount paid via card";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        cardName: formData.cardName,
        cardNumber: formData.cardNumber.replace(/\s/g, ""),
        expiryDate: formData.expiryDate,
        cvc: formData.cvc,
        amount: Number(formData.amount),
      });
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "8px",
  };

  return (
    <div style={{ marginTop: "10px", borderTop: "1px solid #eee", paddingTop: "10px" }}>
      <label>Name on Card</label>
      <input type="text" name="cardName" value={formData.cardName} onChange={handleChange} placeholder="Jane Doe" style={inputStyle} />
      {errors.cardName && <div style={{ color: "red" }}>{errors.cardName}</div>}

      <label>Card Number</label>
      <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" style={inputStyle} />
      {errors.cardNumber && <div style={{ color: "red" }}>{errors.cardNumber}</div>}

      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label>Expiry (MM/YY)</label>
          <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} placeholder="MM/YY" style={inputStyle} />
          {errors.expiryDate && <div style={{ color: "red" }}>{errors.expiryDate}</div>}
        </div>
        <div style={{ flex: 1 }}>
          <label>CVC</label>
          <input type="text" name="cvc" value={formData.cvc} onChange={handleChange} placeholder="123" style={inputStyle} />
          {errors.cvc && <div style={{ color: "red" }}>{errors.cvc}</div>}
        </div>
      </div>

      <label>Amount Paid via Card</label>
      <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="0.00" style={inputStyle} />
      {errors.amount && <div style={{ color: "red" }}>{errors.amount}</div>}

      <button type="button" className="btn btn-primary btn-sm" onClick={handleSubmit}>
        Save Card Details
      </button>
    </div>
  );
};
