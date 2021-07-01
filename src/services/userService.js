import { JWTDecode } from "./api/admin/userapi"
import { getInStore, TOKEN_KEY } from "./store"
import { isExpired } from "./tokenService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export const isAuthorized = () => {
    if(getInStore(TOKEN_KEY) !== false){
        if(isExpired() === false){
            return true
        }else {
            return false
        }
    }else{
        return false
    }
    
}

export const verifyAccessRights = (pageRights) => {
    const token = getInStore(TOKEN_KEY)
    let authorized = false
    if(token !== false){
        const userRights = JWTDecode().login.droits
        console.log(userRights)
        for (let i = 0; i < pageRights.length; i++) {
        
            for (let j = 0; j < userRights.length; j++) {
                if(pageRights[i] === userRights[j]){
                    authorized = true
                }
            
            }  
        
        }
    }
    return authorized
}