import {createSlice}  from "@reduxjs/toolkit"
import { Login,  Logout } from "../reduxActions/signupLoginActions"
import { AddCategoryToSlice } from "../reduxActions/addCategoryToSlice";

const initialState= {
    islogin:null,
    reduxCategory:[]
}

const expenseSlice=  createSlice({
    name:"expenseSliceName",
    initialState,
    reducers:{
        


        Login: (cstate,action)=>{
            let {payload:user} = action
            cstate.islogin = user;
        },
        Logout: (cstate,action)=>{
            // estate.islogin= null;
            // estate.category=[];
            console.log("checking logout button working",cstate.islogin);
            
            cstate.islogin= null
        },
        AddCategoryToSlice ,     
    }
})



let login= expenseSlice.actions.Login;
let logout= expenseSlice.actions.Logout;
let addCategoryToSlice = expenseSlice.actions.AddCategoryToSlice

let red=  expenseSlice.reducer;

 

export {login,logout,addCategoryToSlice,red}