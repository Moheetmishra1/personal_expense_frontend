import { useState } from "react";

function useStateUpdateHook(a){
    let [user,setUser]= useState(a)
    function updateState({target:{value,name}}){
        setUser({...user,[name]:value});

    }

    return [user,updateState];
}

export {useStateUpdateHook}