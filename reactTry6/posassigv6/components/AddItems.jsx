import React, { useState, useEffect } from 'react'
import FormAddItems from './FormAddItems';
import AddedItemsScreen from './AddedItemsScreen';
import InvoiceDetails from './InvoiceDetails';


function AddItems() {
  const [showModal, setShowModal] = useState(false);
  const [insertedItems, setInsertedItems] = useState([]);
   const [invoiceItems, setInvoiceItems] = useState([]);

  // Load existing items from localStorage when component starts
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("addedItems")) || [];
    setInsertedItems(savedItems);
    const savedInvoice = JSON.parse(localStorage.getItem("invoiceItems")) || [];
    setInvoiceItems(savedInvoice);
  }, []);

  // Save items to localStorage every time insertedItems changes
  useEffect(() => {
    localStorage.setItem("addedItems", JSON.stringify(insertedItems));
  }, [insertedItems]);

    useEffect(() => {
    localStorage.setItem("invoiceItems", JSON.stringify(invoiceItems));
  }, [invoiceItems]);

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    
    setShowModal(false);
  }

  function handleInsertItems(items) {
    // Append new items to the list
    setInsertedItems(prev => [...prev, ...items]);
    setShowModal(false);
  }

     function handleAddtoInvoice(itemToAdd) {
    setInvoiceItems(prevItems => {
      const existingItem = prevItems.find(item => item.name === itemToAdd.name); // Assuming name is a unique identifier

      if (existingItem) {
        // If the item exists, increase its quantity
        return prevItems.map(item =>
          item.name === itemToAdd.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If the item is new, add it with a quantity of 1
        return [...prevItems, { ...itemToAdd, quantity: 1 }];
      }
    });
  }

  return (
    <div className='mainComp'>
      <div className='poshead'>
        <h1>Transaction System</h1>
      </div>
      <div className='maincomp-body'>
        <div className="btnadd">
          <button
            type="button"
            className="additem"
            onClick={handleShowModal}
          >
            Click To Add Items
          </button>

          <FormAddItems
            isOpen={showModal}
            onClose={handleCloseModal}
            onInsert={handleInsertItems}
          />
        </div>

        <div className='items-grid-screen'>
          <AddedItemsScreen itemDetails={insertedItems} onAddToInvoice={handleAddtoInvoice} />
        </div>
        <div className='invoice-details'>
          {invoiceItems.length > 0 &&(
        <InvoiceDetails AddedItems={invoiceItems} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddItems;
