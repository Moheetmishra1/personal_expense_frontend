
function errorHandlerInput(e,ref,callback,value){
    let a= callback(value)
    if(a){
        ref.current.innerHTML=a;
        e.style="border:1px solid red;border-top:none;"
    }else{
         ref.current.innerHTML="";
        e.style="border:none;"
    }
}

export {errorHandlerInput}