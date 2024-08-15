import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import("../CSS/HistoryExpense.css")

function HistoryExpense() {
    let {islogin} = useSelector(store=>store.cart)
    let [expenseHistory,setHistory] = useState([])
    let [rendering,setRendering] = useState(true)
    // console.log(islogin);


let deleteExpense = async (id)=>{
    try{
        let  data= await axios.delete(`https://personal-expense-tracker-a2i1.onrender.com/api/v1/deleteexpense/${id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
            }
       })
        console.log(data);
        setRendering(!rendering)
    }catch(err){
        console.log(err);
    }
}

let updateExpense = async(id)=>{
    try{
    }catch(err){
        console.log(err);
    }
}

let fetchHistory = async ()=>{
    let {data} =await axios.get(`https://personal-expense-tracker-a2i1.onrender.com/api/v1/allexpenses/${islogin._id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
        }
   })
    console.log(data.data);
    setHistory(data.data)
}

    useEffect(()=>{
        fetchHistory()

    },[rendering])

  return (
    <>
        
        <div className='historyExpense'>
            <ul>
                {expenseHistory.map((a,index)=>{
                    return <li key = {index}>Price:{a.amount} date:{a.date} Category:{a.category} <button onClick={()=>{updateExpense(a._id)}}>Update</button> <button onClick={()=>{deleteExpense(a._id)}}>Delete</button></li>
                })}
            </ul>
    </div>
    </>

  )
}

export default HistoryExpense