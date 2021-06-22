import axios from "axios";

const BASE_URL = "http://localhost:3333/"

export async function insertMachine(label) {
    const url = BASE_URL + "machine/add"
    const result = axios.post(url,{label: label})
    return result
}