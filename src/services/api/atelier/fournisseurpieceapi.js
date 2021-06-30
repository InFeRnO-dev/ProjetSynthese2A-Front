import axios from "axios";

const BASE_URL = "http://localhost:3333/"

export async function getAllFournisseur() {
    const url = BASE_URL + "fournisseur_piece"
    const result = await axios.get(url)
    return result.data
}