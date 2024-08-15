

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import "../CSS/PeriodicExpend.css"
import { logout } from '../../Redux/React_Slice/expense.reduxSlice';
import { useNavigate } from 'react-router-dom';


function PeriodicExpend() {
  const { islogin,reduxCategory } = useSelector(store => store.cart);
  const [Allexpense, setAllExpense] = useState([]);
  const [categories, setCategories] = useState({});
  const dipatchToLogout= useDispatch()

  let navToLogin= useNavigate()
  let startDate= useRef()
  let endDate = useRef()


  const processExpenses = () => {
    const categoriesData = {};
    Allexpense.forEach(expense => {
      if (!categoriesData[expense.category]) {
        categoriesData[expense.category] = 0;
      }
      categoriesData[expense.category] += expense.amount;
    });
    setCategories(categoriesData);

  };


  const dayMonthly = async (day) => {
    try {
      const { data } = await axios.get(`https://personal-expense-tracker-a2i1.onrender.com/api/v1/allexpenses/?&filter=${day}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
        }
   });
      if(!data.error){


      setAllExpense(data.data);
      processExpenses();
      }else{
        sessionStorage.clear()
        dipatchToLogout(logout())

        navToLogin("/login")

      }

    } catch (err) {
      console.log(err);
    }
  };



  const rangeDate= async (e)=>{
    e.preventDefault()

    if(!startDate.current.value || !endDate.current.value){
      return
    }

    try{

        const { data } = await axios.get(`https://personal-expense-tracker-a2i1.onrender.com/api/v1/allexpenses/?field=${startDate.current.value},${endDate.current.value}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
          }
     });

     if(!data.error){


      setAllExpense(data.data);
      processExpenses();
      }else{
        sessionStorage.clear()
        dipatchToLogout(logout())

        navToLogin("/login")

      }
    }catch(err){
        console.log(err);
    }

  }

  
  useEffect(()=>{
    dayMonthly("monthly")
  },[])
  

  return (
    <div className='dataAnalysistBox'>
      <div className="graphBox">
        <div className='periodicExpendFilterTable'>

      <div>PeriodicExpend <button className='periodicbutton' onClick={()=>{dayMonthly("today")}}>Today</button> <button className='periodicbutton' onClick={()=>{dayMonthly("monthly")}}>Monthly</button> </div>
      <div><form onSubmit={rangeDate}><input type="date"  ref={startDate} /> <input type="date"   ref={endDate} /> <input className="periodicbutton" type="Submit" /></form> </div>
      </div>
      <div className="expenses-graph">
        <h1>Expenses by Category</h1>
        <BarChart width={500} height={300} data={Object.keys(categories).map(category => ({ name: category, value: categories[category] }))}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
      <div className="maximumExpanse"></div>
      </div>
    </div>
  );
}

export default PeriodicExpend;