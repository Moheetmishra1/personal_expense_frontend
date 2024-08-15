import React, {  useRef, useState } from 'react'
import "../../CSS/Signup.css"
import InputComponent from '../InputComponent'
import ButtonComponent from '../ButtonComponent'
import { NavLink, useNavigate } from 'react-router-dom'
import {numberCheck,emailCheck,nameCheck,passwordCheck} from "../../validation"
import { errorHandlerInput } from '../../Helper/ErrorHandler'
import axios from 'axios'

function Signup() {
    let [user,setUser] = useState({first:"",last:"", email:"",mobile:"",password:"",confirmPassword:"",dob:"",gender:""})
    let refFirst = useRef()
    let refLast = useRef()
    let refEmail = useRef()
    let refMobile = useRef()
    let refPwd = useRef()
    let refCPwd = useRef()
    let refDob = useRef()
    let refGender= useRef()
    let errorMessage = useRef("")
    let navigateToLogin= useNavigate()

    function update({target}){
         setUser({...user,[target.name]:target.value});
        errorMessage.current.innerHTML="";

        switch(target.name){
            case "first":{ errorHandlerInput(target,refFirst,nameCheck,target.value)  ;break};
            case "last":{ target.value && errorHandlerInput(target,refLast,nameCheck,target.value);break};
            case "email":{ errorHandlerInput(target,refEmail,emailCheck,target.value);break};
            case "mobile":{ errorHandlerInput(target,refMobile,numberCheck,target.value);break};
            case "password":{ errorHandlerInput(target,refPwd,passwordCheck,target.value);break};
            case "confirmPassword":{ errorHandlerInput(target,refCPwd,passwordCheck,target.value);break};

        }
    }


    let sendDetails = async(e)=>{
        e.preventDefault()
            try{
                if( !user.first || !user.email || !user.mobile || !user.dob || !user.gender || !user.password || !user.confirmPassword){
                  errorMessage.current.innerHTML = "All fields are Mandatory."
                  return 
                }

            let err= nameCheck(user.first)  || emailCheck(user.email) || numberCheck(user.mobile)
            passwordCheck(user.password)  || passwordCheck(user.confirmPassword) || !user.dob  || !user.gender 
                console.log(nameCheck(user.first));
                if(err){
                    if(err=== true){
                  errorMessage.current.innerHTML = "D.o.B and Gender are Mandatory."
                return;
                    }
                  return errorMessage.current.innerHTML = err
            
                }
                err= nameCheck(user.last)
                if(user.last && err){
                errorMessage.current.innerHTML = "D.o.B and Gender are Mandatory."
                        return 
                }
                if(user.password !== user.confirmPassword){

                    return  errorMessage.current.innerHTML = "Password doesn't match."

                }
                // user.category=["Food","Transportation","Housing","Entertainment"]
                let {data} = await axios.post("https://personal-expense-tracker-a2i1.onrender.com/api/v1/signup",user)
                if(data.error){
                        errorMessage.current.innerHTML=data.message
                }else{
                        errorMessage.current.innerHTML=data.message
                        errorMessage.current.style="color:green;"
                    setTimeout(()=>{
                        navigateToLogin("/login")
                    },1000)

                }
        }catch(err){
           console.log(err)
        }       
    }



  return (
    <div className='signupBox'>

      <div className='signupd'>
      <div className='tranferSignup'>

</div>
      <div className="signupContent">
           
        </div>
        </div>
       
        <div className="signupDesign">
            <div className='signupOuterForm'>
                <h1 className='kalnia-glaze-signHeading '>Create Account</h1>
                <span className='errorMessage' ref={errorMessage}></span>
                    <form onSubmit={sendDetails} className='signupForm'>
                        <div className='signName'>
                            <div>
                                <label htmlFor="fname" className='oninput' >First</label>
                                <InputComponent  type="text"  className='signInputBox' Name='first' id='fname' changeUser={update}    placeholder="Enter first name" />
                                    <span  style={{color:"red"}} ref={refFirst}></span>
                            </div>
                            <div>
                                <label htmlFor="lname" className='oninput'>Last</label>
                                <InputComponent type="text"  className='signInputBox'  Name='last' changeUser={update} placeholder='Enter last name' />
                                <span style={{color:"red"}} ref={refLast}></span>

                            </div>
                        </div>

                        <div className='signName'>
                                <div>
                                <label htmlFor="email" className='oninput'>Email</label>
                                <InputComponent type="email" placeholder="enter email" className='signInputBox' changeUser={update} id='email' Name='email' />
                                <span style={{color:"red"}} ref={refEmail}></span>

                                </div>

                                <div>
                                <label htmlFor="mobile" className='oninput'>Mobile</label>
                                <InputComponent  type="tel" placeholder="enter mobile" className='signInputBox' changeUser={update} Name='mobile' id='mobile'/>
                                <span style={{color:"red",fontSize:"10px"}} ref={refMobile}></span>

                        </div>
                        </div>

                        <div className='signName'>
                                <div>
                                <label htmlFor="password" className='oninput'>Password</label>
                                <InputComponent   type="password"   className='signInputBox' Name='password' changeUser={update} placeholder="password"  />
                                <span style={{color:"red"}} ref={refPwd}></span>

                                </div>

                                <div>
                                    
                                <label htmlFor="cpassword" className='oninput'>Confirm Password</label>
                                <InputComponent type="password" className='signInputBox' Name="confirmPassword" id='cpassword' changeUser={update} placeholder="Enter Confirmpassword" />
                                <span style={{color:"red"}} ref={refCPwd}></span>

                                </div>
                        </div>

                        <div>

                        <label htmlFor="date" className='oninput'>D.o.b</label>
                        <input  type="date" className='signInputBox'  name='dob' id='date' onChange={update} />
                        <span style={{color:"red"}} ref={refDob}></span>

                        {/* <input type="date" className='signInputBox'  name='dob' id='date'  /> */}
                        </div>
                          <div className='gender'>
                                <label htmlFor="gender">Gender</label>

                          <div className="d-flex gap-2 justify-content-center py-1">
                                <span className="badge d-flex p-3 align-items-center text-bg-primary rounded-pill">
                                    <label htmlFor="male" style={{paddingRight:"5px"}}>Male</label>
                                    <input type="radio" name="gender" id='male' value="male"  onClick={update} />
                                </span>
                                <span className="badge d-flex p-3 align-items-center text-primary-emphasis bg-danger-subtle rounded-pill">
                                    <label htmlFor="female" style={{paddingRight:"5px"}}>Female</label>
                                    <input type="radio" name="gender" id='female' value="female"  onClick={update} />
                                </span>
                                <span className="badge d-flex p-3 align-items-center text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill">
                                    <label htmlFor="other" style={{paddingRight:"5px"}}>Other</label>
                                    <input type="radio" name="gender"  id="other" value="other"  onClick={update} />
                                </span> 
                                </div>
                                <span ref={refGender}></span>
                        </div  >
                            <div style={{display:"flex",justifyContent:"center" ,gap:"10%"}}>
                                <ButtonComponent className="submit" type="submit" /> <ButtonComponent className="reset" type="reset" />
                        </div>
                        {/* <input type="submit" /> */}
                    </form>

        <p className="text-gr╕ay-soft text-center small mb-2">By clicking "Sign up" you agree to our <NavLink to="https://themes.getbootstrap.com/terms">Terms of Service</NavLink>.</p>
        <p className="text-gray-soft text-center small mb-2">Already have an account? <NavLink to="/login">Sign in</NavLink></p>      

            </div>
        </div>


    </div>
  )
}

export default Signup