import React from 'react'
import("../CSS/ButtonComponent.css")

function ButtonComponent({type,className}) {
  return (
    <input className={`button ${className} `} type={type}  />
  )
}

export default ButtonComponent