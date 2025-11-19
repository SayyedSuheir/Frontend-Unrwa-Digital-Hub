import React from 'react'


function AddedItemsScreen({itemDetails,onAddToInvoice }) {
    
   
  return (
   <div className='card-container'>
    {itemDetails.map((item,index)=>
        <div key={index} className="card">
            
            <div className="card-body">
                <h5 className="card-title">Name: {item.name}</h5>
                <p className="card-text">Price: {item.price}</p>
                <p className="card-text">Fees: {item.fees}</p>
            
                <button className="btn btn-primary" onClick={() => onAddToInvoice(item)} >Add</button>
            </div>
            
        </div>
        )}
    </div>
   
  )
}

export default AddedItemsScreen