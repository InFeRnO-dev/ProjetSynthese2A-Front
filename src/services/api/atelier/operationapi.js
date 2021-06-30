import axios from "axios";

const BASE_URL = "http://localhost:3333/"

export async function getAllOperations() {
    const url = BASE_URL + "operation"
    const result = await axios.get(url)
    return result.data
}

export async function insertOperation(operation) {
    const url = BASE_URL + "operation/add"
    const result = await axios.post(url, operation)
    console.log(result.data)
    return result.data
}