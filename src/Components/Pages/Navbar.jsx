import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import  {logout}  from "../../../Redux/React_Slice/expense.reduxSlice"
import "../../CSS/Navbar.css"




function Navbar() {
    let {islogin} = useSelector((store)=>store.cart);
    let dispatchLogout= useDispatch()
    

  return (
    <div className='navbarBox'>
      <div>        <img src="/Images/colorful-bird.png" alt="no"  width={"50px"} height={"80%"}/> <NavLink to="/" style={{color:"white"}}>Expense Daily</NavLink>
      </div>

       {islogin &&  <NavLink to="/">Home</NavLink>}
       {!islogin && <NavLink to="/login">Login</NavLink>}
       {!islogin && <NavLink to="/signup">Signup</NavLink>}
       {islogin && <NavLink to="/paymenthistory">History</NavLink>}

        {islogin && <div className="logoutIcon">
            
            <img src="Images/photographer.jpg" alt="mdo" width="32" height="32" style={{borderRadius:"100%",boxShadow:"1px 1px 4px black"}} />
            <button  className='logout' onClick={()=>{sessionStorage.clear();  dispatchLogout(logout())}}>  Sign Out </button>
            
                </div>}
    </div>
   
  )
}

export default Navbar