import axios from "axios";

const BASE_URL = "http://localhost:3333/"

export async function updateStockPiece(id_stock_piece, quantite){
    const url = BASE_URL + "stock_piece/edit/" + id_stock_piece
    const result = await axios.put(url, {quantite: quantite})
    return result
}