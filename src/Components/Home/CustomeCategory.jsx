import React, { useRef } from 'react'
import customCategory from "../../CSS/Home/CustomCategory.module.css"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {addCategoryToSlice, login, logout} from "../../../Redux/React_Slice/expense.reduxSlice"
import { useNavigate } from 'react-router-dom'

function CustomeCategory() {
  let {reduxCategory} = useSelector(store=>store.cart)
  const dipatchToLogout= useDispatch()
  let navToLogin= useNavigate()

    let inputRef = useRef("custom input value")
    let dispatch = useDispatch()



    const addCategory = async (e)=>{
        e.preventDefault()
        try{ 
        let cate= inputRef.current.value;
        if(cate){
            let {data}=await axios.post(`https://personal-expense-tracker-a2i1.onrender.com/api/v1/updateusercategory/`,{cate}, {
              headers: {
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
              }
         })
         console.log(data  );
         if(!data.error){
     
            dispatch(addCategoryToSlice([...reduxCategory,cate]))
            inputRef.current.value=""
         }else{
           if(data.message==="jwt expired" || data.message==="jwt malformed"){
            console.log("enter");
            sessionStorage.clear()
            dipatchToLogout(logout())

            navToLogin("/login")

          }
         }
         

        }
    }catch(err){
        console.log(err);
    }

    }
  return (
   
    
    <div className={customCategory.customCategory}><h2>Add Custom Category</h2>
    
    <form onSubmit={addCategory}>  <input type="text" ref={inputRef} style={{textTransform:"capitalize"}}  /><input type='submit' className={customCategory.submit} /></form>
      </div>
  )
}

export default React.memo(CustomeCategory)