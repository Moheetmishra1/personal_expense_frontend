import React, { useCallback, useEffect, useState } from 'react'
import "../../CSS/Home.css"
import AddExpense from '../AddExpense';

import PeriodicExpend from '../PeriodicExpend';
import CustomeCategory from '../Home/CustomeCategory';

function Home() {
 

  return (
   <>
   <div  className='homeCss'>

  <div style={{gridRowStart:1,gridRowEnd:3}  }>   <PeriodicExpend />
          </div>
          <div className="addExpGrid">
   <AddExpense  />
   </div>

<div className="customGrid">
     <CustomeCategory  />
     </div>


    </div>
   </>
  )
}

export default Home