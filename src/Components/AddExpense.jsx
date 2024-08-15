import React, {  useRef} from 'react'
import "../CSS/AddExpense.css"
import { useStateUpdateHook } from '../Helper/useStateUpdate'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Redux/React_Slice/expense.reduxSlice'
import { useNavigate } from 'react-router-dom'

function AddExpense() {
  let {reduxCategory } = useSelector(store=>store.cart)
  let [expense,setExpense] = useStateUpdateHook({amount:"",category:"",date:"",description:""})
  let refAmount =useRef()
  let refCatagory =useRef()
  let refDate =useRef()
  let refDesc =useRef()
  let dipatchToLogout= useDispatch()
  let navToLogin= useNavigate()

  let addExpense = async (e)=>{
    e.preventDefault()


    try{
          if(!expense.category){expense.category="Food"}
      let {data} =await axios.post("https://personal-expense-tracker-a2i1.onrender.com/api/v1/addexpense",expense,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
          }
     } )

     if(!data.error){
      refAmount.current.value="";
      refCatagory.current.value=""
      refDate.current.value=""
      refDesc.current.value=""
      expense={amount:"",category:"",date:"",description:""}
     }else{
      if(data.message=="jwt expired"){
        dipatchToLogout(logout())
        sessionStorage.clear()
        navToLogin("/login")
        
      }
     }   
    }catch(err){
      console.log(err);
    }
  }


  return (
    <>
     <div className='addExpenseBox'>

<h1 style={{textAlign:"center"}}>Personal Expenses Tracker</h1>
<form id="expense-form" className='homeForm' onSubmit={addExpense}>
  <label htmlFor="amount">Amount:</label>
  <input type="number" className='specialInput' ref={refAmount}  id="amount" name="amount" required onKeyUp={setExpense} />

  <label htmlFor="category" className='HomeAddExpense'>Category:</label>
  <span><select id="category" className='homeSelect' ref={refCatagory} name="category"  onChange={setExpense}>
         <option    value="">Select a category</option>
    {reduxCategory.map((a,index)=>{
      return <option key={index}  value={a}>{a.toUpperCase()}</option>
    })}
    
  
  </select></span>

  <label htmlFor="date">Date:</label>
  <input type="date" id="date" className='specialInput' ref={refDate} name="date" required onChange={setExpense} />

  <label htmlFor="description">Description:</label>
  <textarea id="description" className='specialInput' ref={refDesc} name="description" required onKeyUp={setExpense}></textarea>

  <button type="submit" className='addExpense'>Add Expense</button>
</form>




  </div>
     
    </>
  )
}

export default React.memo(AddExpense )