import axios from "axios";
import { getInStore, TOKEN_KEY } from '../../services/store'
import jwt_decode from "jwt-decode";
const BASE_URL = "http://localhost:3333/"

export function JWTDecode() {
    const token = jwt_decode(getInStore(TOKEN_KEY))
    return token
}

export async function getAllUser(){
    const url = BASE_URL + 'user'
    const result = await axios.get(url)
    return result.data
}

export async function getUserByEmail(email) {
    const result = await axios.post(BASE_URL + 'user', {email: email})
    .then((response) => response)
    .catch((error) => console.log(error))

    return result.data
}

export async function getTokenByEmail(email, pwd) {
    const result = await axios.post(BASE_URL + 'user/authenticate', {email: email, password: pwd})
    .then((response) => response)
    .catch((error) => console.log(error))

    return result.data
}

export async function insertUser(email, password) {
    const url = BASE_URL + "user/add"
    const result = await axios.post(url, {email: email, password: password})
    .then((response) => response)
    .catch((error) => console.log(error))

    return result
}

export async function updateUser(id, email, password){
    const url = BASE_URL + "user/edit/" + id
    const result = await axios.put(url, {email: email, password: password})
    .then((response) => response)
    .catch((error) => console.log(error))

    return result
}

export async function deleteUser(id){
    const url = BASE_URL + "user/delete/" + id
    const result = await axios.delete(url)
    .then((response) => response)
    .catch((error) => console.log(error))

    return result
}