import axios from "axios";

const BASE_URL = "http://localhost:3333/"

export async function getAllRealisations() {
    const url = BASE_URL + "realisation"
    const result = await axios.get(url)
    return result.data
}

export async function insertRealisation(id_gamme){
    const url = BASE_URL + "realisation/add"
    const result = await axios.post(url, {id_gamme: id_gamme})
    return result.data
}