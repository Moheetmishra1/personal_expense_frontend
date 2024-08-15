
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Pages/Navbar'
import Login from './Components/Pages/Login'
import Signup from './Components/Pages/Signup'
import Authentication from './Components/Authentication'
import Update from './Components/Pages/Update'
import React, { Suspense } from 'react'

//^ LazyLoad Component
let LazyHome= React.lazy(()=> import("./Components/Pages/Home.jsx"))
let LazyPaymentHistory= React.lazy(()=>import("./Components/PaymentHistory"))

function App() {
  

  return (
    <>
     <BrowserRouter>
     <Navbar />
     <Routes>
      <Route path="/" element= {<Authentication><Suspense fallback={<h1>Loading.........</h1>}> <LazyHome /></Suspense></Authentication> }/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/paymenthistory" element={<Authentication ><Suspense fallback={<h1>Loading.........</h1>}><LazyPaymentHistory /></Suspense> </Authentication> }/>
      <Route path="/update/:pid" element={<Authentication><Update /></Authentication> } />
      <Route path='*' element={<h1 style={{color:"red"}}> Page not found....</h1>}/>
     </Routes>
     </BrowserRouter>
    

    </>
  )
}

export default App
