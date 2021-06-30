import axios from "axios";

const BASE_URL = "http://localhost:3333/"

export async function getAllMachinesByIdPosteTravail(id) {
    const url = BASE_URL + "poste_machine/poste_travail/" + id
    const result = await axios.get(url)
    return result.data
}

export async function getPosteMachineById(id_poste_travail, id_machine){
    const url = BASE_URL + "poste_machine/" + id_poste_travail + "/" + id_machine
    const result = await axios.get(url)
    return result.data
}

export async function getAllMachinesWithoutPosteTravail() {
    const url = BASE_URL + "poste_machine/machine"
    const result = await axios.get(url)
    return result.data
}

export async function insertPosteMachine(id_poste_travail, id_machine) {
    const url = BASE_URL + "poste_machine/add"
    const result = await axios.post(url, {id_poste_travail: id_poste_travail, id_machine: id_machine})
    return result
}

export async function deletePosteMachine(id_poste_travail, id_machine) {
    const url = BASE_URL + "poste_machine/" + id_poste_travail + "/" + id_machine
    const result = await axios.delete(url)
    return result
}