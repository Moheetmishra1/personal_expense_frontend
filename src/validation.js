
function nameCheck(nam){
    const nValid = /^[a-zA-Z]+$/

    return !nam ? "Name is Mandantory." :(typeof nam !== "string")? "Name must be in the form of string" : !nValid.test(nam) ? "Only alphabet allows in name." :"";
}

function emailCheck(Email){
    const eValid = /^[a-zA-Z0-9\.]+@[a-z]+[\.][a-z]{2,3}$/

    return !Email ? "Email is Mandatory" : (typeof Email !== "string") ?"Email must be in the form of string" : !eValid.test(Email)? "Email is not valid" :"";
}

function numberCheck(number){

    let numberCheck= /^(6|7|8|9)\d{9}$/

    return !number ? "Number is Mandatory" : !numberCheck.test(number) ? "Mobile number must be 10 digit number and start be with 6/7/8/9" :"";
}


function passwordCheck(password){


    if(!password){

        return "password is Mandatory."
    }
    if((typeof password !== "string")){
        return "Password must be in the form of string."
    }
    password= password.trim()

   let num,lower,upper,special;
   for(let a=0; a<password.length; ++a){
    if(password[a]>='a' && password[a]<="z"){
        lower = true
    }
    if(password[a]>="A" && password[a]<="Z"){
        upper= true
    }
    if(password[a]>=0 && password[a]<=9){
        num= true;
    }
    if(password[a]==='@'|| a==="." || password[a]==="-"){
        special= true;
    }
   }

   if(!(password.length>= 6 && password.length<=15)){
    return "Password length must be 6-15 letter."
   }
   if(!num){
    return "Password must contain atleast one number."
   }

   if(!lower){
    return "Password must contain atleast one lower letter."
   }
   
   if(!upper){
    return "Password must contain atleast one upper letter"
   }
   
   if(!special){
    return "Password must contain atleast '@' or '-' '.' character. "
   }
   return ""   
}


export  {numberCheck,emailCheck,nameCheck,passwordCheck}