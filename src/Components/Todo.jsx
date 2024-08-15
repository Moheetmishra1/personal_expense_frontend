import React from 'react'

function Todo({todo,del,id}) {


  return (
    <div>{todo} <button onClick={()=>{del(id)}}>Delete</button></div>
  )
}

export default Todo