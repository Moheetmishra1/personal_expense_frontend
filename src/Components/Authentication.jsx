
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function Authentication({children}) {
    let {islogin} = useSelector((store)=>store.cart)

    if (islogin) {
        return <>
            {children}
        </>
    }
    
    return <Navigate to="/login" />


}

export default Authentication