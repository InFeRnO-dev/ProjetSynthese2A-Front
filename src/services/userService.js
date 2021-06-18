import { JWTDecode } from "./api/userapi"
import { removeInStore, TOKEN_KEY } from "./store"
import { isExpired } from "./tokenService"

export const isAuthorized = () => {
    if(isExpired() === false){
        return true
    }else {
        removeInStore(TOKEN_KEY)
        return false
    }
}

export const verifyAccessRights = (pageRights) => {
    let authorized = false
    const userRights = JWTDecode().login.droits
    console.log(userRights)
    for (let i = 0; i < pageRights.length; i++) {
        
        for (let j = 0; j < userRights.length; j++) {
            if(pageRights[i] === userRights[j]){
                console.log("page: " + pageRights[i] + " && user: " + userRights[j])
                console.log("true")
                authorized = true
            }
        
        }  
        
    }
    return authorized
}