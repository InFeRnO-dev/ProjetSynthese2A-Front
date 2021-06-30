import axios from "axios";

const BASE_URL = "http://localhost:3333/"

export async function getAllGamme(){
    const url = BASE_URL + "gamme"
    const result = await axios.get(url)
    return result.data
}

export async function getGammeByIdPiece(id_piece) {
    const url = BASE_URL + "gamme/" + id_piece
    const result = await axios.get(url)
    return result.data
}

export async function insertGamme(label, id_user, id_piece) {
    const url = BASE_URL + "gamme/add"
    const result = await axios.post(url, {label: label, id_user: id_user, id_piece: id_piece})
    return result
}