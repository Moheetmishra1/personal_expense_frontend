 const Login=(cstate,action)=>{
    let {payload:user} = action
    cstate.islogin = user;
}

 const Logout= (cstate,action)=>{
    // estate.islogin= null;
    // estate.category=[];
    console.log("checking logout button working",cstate.islogin);
    
    cstate= {islogin:null,category:[]}
}


export {Login, Logout}