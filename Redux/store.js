import { configureStore }  from "@reduxjs/toolkit";
import {red} from "./React_Slice/expense.reduxSlice"

 let store = configureStore({
    reducer:{
        cart:red,
    }
});

export default store;