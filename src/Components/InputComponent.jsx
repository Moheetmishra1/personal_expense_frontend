import React from 'react'

function InputComponent({type,Name,className,id ,changeUser, ref}) {
    
  return (
    <>

    
    <input type={type}  name={Name}  className={className} ref={ref} id={id} onKeyUp={changeUser} />

    </>
  )
}

export default InputComponent