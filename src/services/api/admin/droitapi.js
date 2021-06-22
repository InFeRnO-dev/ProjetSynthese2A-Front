import axios from "axios";

const BASE_URL = "http://localhost:3333/"

export async function getAllDroits() {
    const url = BASE_URL + "droits"
    const result = await axios.get(url)
    return result.data
}

export async function getAllUserDroitsByIdUser(id){
    const url = BASE_URL + "droits/" + id
    const result = await axios.get(url)
    return result.data
}

export async function insertUserDroits(id_droits, id_user){
    console.log(id_droits,id_user)
    const url = BASE_URL + "user_droits/add"
    const result = await axios.post(url, {id_droits: id_droits, id_user: id_user})
    return result
}

export async function deleteUserDroits(id_droits, id_user){
    const url = BASE_URL + "user_droits/" + id_droits + "/" + id_user
    const result = await axios.delete(url)
    return result
}