import axios from "axios";

const BASE_URL = "http://localhost:3333/"

export async function getAllPieces() {
    const url = BASE_URL + "piece"
    const result = await axios.get(url)
    return result.data
}

export async function getAllPieceByType(id_type_piece){
    const url = BASE_URL + "piece/type/" + id_type_piece
    const result = await axios.get(url)
    return result.data
}

export async function insertPiece(reference, label, prix_vente, prix_achat, id_stock_piece, id_type_piece, id_fournisseur_piece) {
    const url = BASE_URL + "piece/add"
    const result = await axios.post(url, {reference: reference, label: label, prix_vente: prix_vente, prix_achat: prix_achat, id_stock_piece: id_stock_piece, id_type_piece: id_type_piece, id_fournisseur_piece: id_fournisseur_piece})
    return result.data
}