import axios from "axios";

const BASE_URL = "http://localhost:3333/"

export async function getCompositionByIdPieceCree(id_piece_cree){
    const url = BASE_URL + "composition/" + id_piece_cree
    const result = await axios.get(url)
    return result.data
}

export async function insertComposition(composition){
    const url = BASE_URL + "composition/add"
    const result = await axios.post(url, {id_piece_cree: composition.id_piece_cree, id_piece_composition: composition.id_piece_composition, quantite: composition.quantite})
    return result
}

export async function deleteComposition(id_composition){
    const url = BASE_URL + "composition/delete/" + id_composition
    const result = await axios.delete(url)
    return result
}