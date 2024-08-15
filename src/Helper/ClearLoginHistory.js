import { logout } from "../../Redux/React_Slice/expense.reduxSlice"

function clearLoginHistory(){
    
    logout()
    sessionStorage.clear()

}

export default clearLoginHistory