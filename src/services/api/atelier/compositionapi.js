import axios from "axios";

const BASE_URL = "http://localhost:3333/"

export async function insertComposition(id_piece_cree, id_piece_composition, quantite){
    const url = BASE_URL + "composition/add"
    const result = await axios.post(url, {id_piece_cree: id_piece_cree, id_piece_composition: id_piece_composition, quantite: quantite})
    return result
}