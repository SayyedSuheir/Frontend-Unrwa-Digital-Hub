import React, { useState } from 'react'

// Receive isOpen prop to control visibility and onClose handler
function FormAddItems({isOpen, onClose, onInsert}) {
     const [itemsList,setItemsList] = useState([{name:"",price:"",fees:""}]);
    // If the modal is not open, return null (render nothing)

    if (!isOpen) return null;
    function handleUserInput(index,key,value){
        const userInput = [...itemsList];
        userInput[index][key] = value;
        setItemsList(userInput);
    }
        
   function InsertUserInput() {
                const { name, price, fees } = itemsList[0];

                // Check empty fields
                if (name.trim() === "" || price === "" || fees === "") {
                    alert("Please fill all fields");
                    return;
                }

                const iPrice = Number(price);
                const iFees = Number(fees);

                // Validate numbers
                if (isNaN(iPrice) || isNaN(iFees)) {
                    alert("Price and Fees must be numbers");
                    return;
                }

                if (iPrice < 0 || iFees < 0) {
                    alert("Price and Fees must be greater than 0");
                    return;
                }

                // Send data back
                if (onInsert) onInsert(itemsList);

                // Reset inputs correctly
                setItemsList([{ name: "", price: "", fees: "" }]);
        }


  return (
    <div>
        <form>
            {/* Add 'show' and 'fade' classes, and inline style display: block */}
            <div className="modal show fade" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                 <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Items</h5>
                            {/* Use onClose handler for close button */}
                            <button type="button" className="btn-close"  onClick={() => {
                               setItemsList([{ name: "", price: "", fees: "" }]); // reset inputs
                                onClose(); // hide modal
                                }} 
                                aria-label="Close">

                            </button>
                        </div>
                        <div className="modal-body">
                          
                             {itemsList.map((item,index) =>

                             <div key={index} className='additemsform'>
                                <label>Item Name</label>
                                <input type="text" 
                                    value={item.name}
                                    onChange={(e)=>handleUserInput(index, "name", e.target.value)}
                                    
                                />
                                <label>Item Price</label>
                                <input type="number" 
                                    value={item.price}
                                    onChange={(e)=>handleUserInput(index, "price", e.target.value)}
                                
                                />
                                <label>Item Fees</label>
                                <input type="number" 
                                    value={item.fees}
                                    onChange={(e)=>handleUserInput(index, "fees", e.target.value)}
                                
                                />
                                </div>
                                )}
                            
                        </div>
                        <div className="modal-footer">
                            {/* Use onClose handler for the "Close" button */}
                            <button type="button" className="btn btn-secondary" 
                            onClick={() => {
                                setItemsList([{ name: "", price: "", fees: "" }]); // reset inputs
                                    onClose();}} // hide modal
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={InsertUserInput}>Insert</button>
                        </div>
                    </div>
                </div>
            </div>  

            {/* Add a modal backdrop when the modal is open */}
            <div className="modal-backdrop show"></div>
        </form>
    </div>
  )
}

export default FormAddItems
