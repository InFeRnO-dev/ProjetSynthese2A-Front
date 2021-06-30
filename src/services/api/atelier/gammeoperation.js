import axios from "axios";

const BASE_URL = "http://localhost:3333/"

export async function getGammeOperationByIdGamme(id_gamme) {
    const url = BASE_URL + "gamme_operation/" + id_gamme
    const result = await axios.get(url)
    return result.data
}

export async function insertGammeOperation(id_gamme, id_operation){
    const url = BASE_URL + "gamme_operation/add"
    const result = await axios.post(url, {id_gamme: id_gamme, id_operation: id_operation})
    return result
}