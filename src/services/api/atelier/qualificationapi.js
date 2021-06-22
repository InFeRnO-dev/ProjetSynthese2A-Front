import axios from "axios";

const BASE_URL = "http://localhost:3333/"

export async function getAllQualificationByIdPosteTravail(id) {
    const url = BASE_URL + "qualification/poste_travail/" + id 
    const result = await axios.get(url)
    return result.data
}

export async function insertQualification(id_user, id_poste_travail) {
    const url = BASE_URL + "qualification/add"
    const result = await axios.post(url, {id_user: id_user, id_poste_travail: id_poste_travail})
    .then((response) => response)
    .catch((error) => console.log(error))

    return result
}

export async function deleteQualification(id_user, id_poste_travail){
    const url = BASE_URL + "qualification/delete/" + id_poste_travail + "/" + id_user
    const result = await axios.delete(url)
    .then((response) => response)
    .catch((error) => console.log(error))

    return result
}