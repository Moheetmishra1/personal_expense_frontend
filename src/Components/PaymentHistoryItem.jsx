import React from 'react'
import "../CSS/PaymentHistoryItem.css"

function PaymentHistoryItem({ date, amount, category, update,deleteExpense,id }) {
  return (
    <div className="payment-history-item">
    <div className="payment-history-date">{date}</div>
    <div className="payment-history-amount"> ₹{amount}</div>
    <div className="payment-history-method">{category}</div>
    <button onClick={()=>{update(id)}} className='paymentUpdate paymentButton'>Update</button>
    <button onClick={()=>{deleteExpense(id)}} className='paymentButton paymentDelete'>Delete</button>
    {/* <div className={`payment-history-status ${status.toLowerCase()}`}>{status}</div> */}
  </div>    
  )
}

export default PaymentHistoryItem