import axios from "axios";

const BASE_URL = "http://localhost:3333/"

export async function getRealisationOperationByIdRealisation(id_realisation){
    const url = BASE_URL + "realisation_operation/" + id_realisation
    const result = await axios.get(url)
    return result.data
}

export async function insertRealisationOperation(id_realisation, id_operation){
    const url = BASE_URL + "realisation_operation/add"
    const result = axios.post(url, {id_realisation: id_realisation, id_operation: id_operation})
    return result
}