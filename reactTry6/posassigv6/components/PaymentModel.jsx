import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function PaymentModel({ isOpen, onClose, invoiceData }) {
  const [paymentMethods, setPaymentMethods] = useState({
    cash: false,
    credit: false,
    debit: false,
  });

  const [cashAmount, setCashAmount] = useState(0);
  const [cardAmounts, setCardAmounts] = useState({ credit: 0, debit: 0 });
  const [cardInfo, setCardInfo] = useState({ credit: null, debit: null });
  const invoiceRef = useRef();

  if (!isOpen) return null;

  // -------------------------
  //  CARD INFO COMPONENT
  // -------------------------
  const PaymentInfo = ({ method, onSubmit }) => {
    const [formData, setFormData] = useState(
      cardInfo[method] || { cardName: "", cardNumber: "", expiryDate: "", cvc: "", amount: "" }
    );

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      let formattedValue = value;

      if (name === "cardNumber") {
        formattedValue = value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim().slice(0, 19);
      }
      if (name === "expiryDate") {
        formattedValue = value.replace(/\D/g, "").replace(/(\d{2})/, "$1/").slice(0, 5);
      }

      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    };

    const validateForm = () => {
      const newErrors = {};
      if (!formData.cardName) newErrors.cardName = "Name is required";
      if (formData.cardNumber.replace(/\s/g, "").length !== 16) newErrors.cardNumber = "Card number must be 16 digits";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = "Expiry must be MM/YY";
      if (!/^\d{3,4}$/.test(formData.cvc)) newErrors.cvc = "CVC must be 3–4 digits";
      if (!formData.amount || Number(formData.amount) <= 0) newErrors.amount = "Enter amount paid via card";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
      if (validateForm()) {
        const data = {
          ...formData,
          cardNumber: formData.cardNumber.replace(/\s/g, ""),
          amount: Number(formData.amount),
        };
        onSubmit(data);
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

  // -------------------------
  //  HANDLE PAYMENT METHOD
  // -------------------------
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPaymentMethods((prev) => ({ ...prev, [name]: checked }));
  };

  const handleCardSubmit = (method) => (data) => {
    setCardInfo((prev) => ({ ...prev, [method]: data }));
    setCardAmounts((prev) => ({ ...prev, [method]: data.amount }));
  };

  

  // -------------------------
  //  CALCULATE TOTALS
  // -------------------------
const totalAmount = invoiceData?.total || 0;
const feeRate = 0.02;

// Sum of card payments (credit + debit)
const cardPayment = (paymentMethods.credit ? cardAmounts.credit : 0) + (paymentMethods.debit ? cardAmounts.debit : 0);

// Calculate card fee for display only
const cardFee = cardPayment * feeRate;

// Total paid excluding fee (used for remaining)
const totalPaid = Number(cashAmount || 0) + cardPayment;

// Remaining balance
const remaining = totalAmount - totalPaid;

/////////////////////////////////
// 
// reset cash amount onclose
// //////////////////////////

const handleCloseModal = () => {
  setCashAmount(""); // reset as empty string
  setCardAmounts({ credit: 0, debit: 0 });
  setCardInfo({ credit: null, debit: null });
  setPaymentMethods({ cash: false, credit: false, debit: false });
  onClose();
};
  // -------------------------
  //  COMPLETE PAYMENT
  // -------------------------

  const handleCompletePayment = async () => {
    if (remaining > 0) {
      return alert(`Payment incomplete! Remaining balance: ${remaining.toFixed(2)}`);
    }

    const element = invoiceRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");

    alert("Invoice exported successfully!");
      // Reset all payment inputs including cash
      handleCloseModal();
  };

  return (
    <div>
      <div className="modal show fade" style={{ display: "block" }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Complete Payment</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div ref={invoiceRef} style={{ padding: "15px", background: "#FEF9E1" }}>
                <h3>Invoice Summary</h3>
                <p><strong>Total Invoice:</strong> {totalAmount.toFixed(2)}</p>
                <p><strong>Cash Paid:</strong> {cashAmount.toFixed(2)}</p>
                <p><strong>Credit Card Paid:</strong> {cardAmounts.credit.toFixed(2)}</p>
                <p><strong>Debit Card Paid:</strong> {cardAmounts.debit.toFixed(2)}</p>
                <p><strong>Card Fee (2%):</strong> {cardFee.toFixed(2)}</p>
                <p><strong>Total Paid:</strong> {totalPaid.toFixed(2)}</p>
                <p><strong>Remaining:</strong> {remaining.toFixed(2)}</p>
              </div>

              <div style={{ marginTop: "20px" }}>
                <label>Choose Payment Method:</label>

                {/* Cash */}
                <div style={{ marginBottom: "10px" }}>
                  <label>
                    <input type="checkbox" name="cash" checked={paymentMethods.cash} onChange={handleCheckboxChange} /> Cash
                  </label>
                  {paymentMethods.cash && (
                    <input
                      type="number"
                      placeholder="Cash amount"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(Number(e.target.value))}
                      style={{ marginLeft: "10px" }}
                    />
                  )}
                </div>

                {/* Credit Card */}
                <div style={{ marginBottom: "10px" }}>
                  <label>
                    <input type="checkbox" name="credit" checked={paymentMethods.credit} onChange={handleCheckboxChange} /> Credit Card
                  </label>
                  {paymentMethods.credit && <PaymentInfo method="credit" onSubmit={handleCardSubmit("credit")} />}
                </div>

                {/* Debit Card */}
                <div style={{ marginBottom: "10px" }}>
                  <label>
                    <input type="checkbox" name="debit" checked={paymentMethods.debit} onChange={handleCheckboxChange} /> Debit Card
                  </label>
                  {paymentMethods.debit && <PaymentInfo method="debit" onSubmit={handleCardSubmit("debit")} />}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
              <button className="btn btn-primary" onClick={handleCompletePayment}>
                Complete Payment & Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </div>
  );
}

export default PaymentModel;
