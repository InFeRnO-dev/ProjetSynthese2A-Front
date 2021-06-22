import axios from "axios";

const BASE_URL = "http://localhost:3333/"

export async function getAllPostestravail(){
    const url = BASE_URL + "poste_travail"
    const result = await axios.get(url)
    return result.data
}

export async function insertPosteTravail(label){
    const url = BASE_URL + "poste_travail/add"
    const result = await axios.post(url, {label: label})
    
    return result
}