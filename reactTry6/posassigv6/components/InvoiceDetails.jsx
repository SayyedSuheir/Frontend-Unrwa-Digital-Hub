import React, { useState } from 'react';
import PaymentModel from './PaymentModel';

function InvoiceDetails({ AddedItems }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Calculate total invoice amount
  const totalAmount = AddedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Optionally calculate total fees if needed
  const totalFees = AddedItems.reduce((sum, item) => sum + item.fees * item.quantity, 0);

  // Prepare data to send to PaymentModel
  const invoiceData = {
    customerName: 'Customer Name Here', // or take from input
    total: totalAmount + totalFees,
    items: AddedItems,
  };

  return (
    <div className='invoice-table-container'>
      <div className='invoice-header'>
        <p>Invoice Details</p>
      </div>
      <table className='invoice-table'>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Total Price</th>
            <th>Total Fees</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {AddedItems.map((item, index) => (
            <tr key={index} className='invoice-body'>
              <td>{item.name}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>${(item.fees * item.quantity).toFixed(2)}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
          
        </tbody>
        
      </table>
      <div className='table-footer'>
         
            
              <button type='button' onClick={handleShowModal}>
                Confirm order
              </button>
           
        
        </div>

      {/* Pass the invoiceData to PaymentModel */}
      <PaymentModel
        isOpen={showModal}
        onClose={handleCloseModal}
        invoiceData={invoiceData}
      />
    </div>
  );
}

export default InvoiceDetails;
