import React, { useEffect, useState } from 'react'
import "../CSS/PaymentHistory.css"
import PaymentHistoryItem from './PaymentHistoryItem'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {logout} from "../../Redux/React_Slice/expense.reduxSlice" 
import { useNavigate } from 'react-router-dom'


function PaymentHistory() {


    let { reduxCategory} = useSelector(store=>store.cart)
    let [expenseHistory,setHistory] = useState([])
    let navToUpdate= useNavigate()
    let navToLogin= useNavigate()
  let dipatchToLogout= useDispatch()

  let [category,setCategory] = useState("All")

  function updateCategory({target:{value}}  ){
    setCategory(value)
  }






let deleteExpense = async (id)=>{
    try{
        let  {data}= await axios.delete(`https://personal-expense-tracker-a2i1.onrender.com/api/v1/deleteexpense/?&q=${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
          }
     })
     console.log(data);
     
        if(!data.error){
          setHistory(data.data)
        }else if(data.message==='jwt expired'){
          sessionStorage.clear()
         dipatchToLogout(logout())
          navToLogin("/login")
        }
    }catch(err){
        console.log(err);
    }
}

let updateExpense = async(id)=>{ 
  navToUpdate(`/update/${id}`)
   
}

let fetchHistory = async ()=>{
    let {data} =await axios.get(`https://personal-expense-tracker-a2i1.onrender.com/api/v1/allexpenses`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
      }
 })

 if(!data.error){
   setHistory([...(data.data)])
 }else{
  if(data.message==="jwt expired"){
    sessionStorage.clear()
    dipatchToLogout(logout())

    navToLogin("/login")

  }
 }
}

useEffect(()=>{
    fetchHistory()

},[])




console.log("rendering");





  return (
    <div className="payment-history-grid">
      <div>
      <h2>Expenses:</h2>
      <select name="categoryList"  onChange={updateCategory}>
      <option value="All">All</option>

        {reduxCategory.map((a,index)=>{
         return  <option key={index} value={a} style={{width:"80px"}}>{a}</option>
        })}
      </select>
      </div>

      <div className="allexpenseDetails">

    {expenseHistory.filter((a)=>{return category==="All"?true:category===a.category}).map((payment) => (
    (  <PaymentHistoryItem
        key={payment._id} 
        id={payment._id}
        date={payment.date}
        amount={payment.amount}
        category={payment.category}
        update={updateExpense}
        deleteExpense= {deleteExpense}

      />)
    ))}
    </div>
  </div>
  )
}

export default PaymentHistory