import React, { useEffect, useRef } from 'react'
import "../../CSS/Home.css"
import "../../CSS/Update.css"
import { useNavigate, useParams } from 'react-router-dom'
import { useStateUpdateHook } from '../../Helper/useStateUpdate'
import axios from 'axios'
import clearLoginHistory from '../../Helper/ClearLoginHistory'

function Update() {
  let [expense,setExpense] = useStateUpdateHook({amount:"",category:"",date:"",description:""})
  let navToHistory = useNavigate()
  let navToLogin= useNavigate()

  let refAmount =useRef()
  let refCatagory =useRef()
  let refDate =useRef()
  let refDesc =useRef()

  
    let {pid} = useParams()
    console.log(expense);

    let updateExpense= async (e)=>{
        e.preventDefault()

        try{
            expense.amount= refAmount.current.value
            expense.date=refDate.current.value
            expense.category=refCatagory.current.value
            expense.description=refDesc.current.value
            if(!expense.category){expense.category="Food"}
            let {data} = await axios.put(`https://personal-expense-tracker-a2i1.onrender.com/api/v1/updateexpense/?&q=${pid}`,expense, {
              headers: {
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
              }
         })
            if(!data.error){

                navToHistory("/paymenthistory")

            }else if(data.message==="jwt expired"){
              clearLoginHistory()
              navToLogin("/login")
            }
        }catch(err){
            console.log(err);
        }
    }


    let fetchSingleExpense= async()=>{
        try{
            let {data} = await axios.get(`https://personal-expense-tracker-a2i1.onrender.com/api/v1/allexpenses/?&q=${pid}`, {
              headers: {
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
              }
         })
          console.log(data);
          
         if(!data.error){
          let {amount,date,category,description}=data.data
            console.log(amount,date,category,description);
                    
            refAmount.current.value=amount
            refCatagory.current.value=category
            refDate.current.value=date
            refDesc.current.value=description

         }else if(data.message==="jwt expired"){
          clearLoginHistory()
          navToLogin("/login") 

         }
            


        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchSingleExpense()
    },[])


  return (
    <>
<form className='updateForm' onSubmit={updateExpense}>
<h1 style={{textAlign:"center"}}>Personal Expenses Tracker</h1>
  <label htmlFor="amount">Amount:</label>
  <input type="number" className='specialInput' ref={refAmount}   id="amount" name="amount" required onKeyUp={setExpense} />

  <label htmlFor="category" className='HomeAddExpense'>Category:</label>
  <select id="category" className='homeSelect'  ref={refCatagory}  name="category"  onChange={setExpense}>
    <option value="">Select a category</option>
    <option value="Food">Food</option>
    <option value="Transportation">Transportation</option>
    <option value="Housing">Housing</option>
    <option value="Entertainment">Entertainment</option>
    <option value="Other">Other</option>
  </select>

  <label htmlFor="date">Date:</label>
  <input type="date" id="date" className='specialInput'ref={refDate} name="date" required onChange={setExpense} />

  <label htmlFor="description">Description:</label>
  <textarea id="description" className='specialInput'   ref={refDesc}  name="description" required onKeyUp={setExpense}></textarea>

  <button type="submit" className='addExpense'>Update Expense</button>
</form>
</>
  )
}

export default Update