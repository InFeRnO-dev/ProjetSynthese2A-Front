import React, { useEffect, useState } from 'react'
import Nav from '../../components/header/nav'
import { Multiselect } from 'multiselect-react-dropdown';
import { getAllPostestravail } from '../../services/api/atelier/postetravailapi';
import { getAllQualificationByIdPosteTravail, insertQualification } from '../../services/api/atelier/qualificationapi';
import QualificationLine from '../../components/atelier/qualificationLine';
import { isAuthorized, verifyAccessRights } from '../../services/userService';
import { formHandleChange } from '../../services/formService';
import InputLabel from '../../components/form/inputLabel';
import { getUserByEmail } from '../../services/api/admin/userapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom'

toast.configure()

export default function Qualification() {
    const PageRights = [5]
    const accessRights = verifyAccessRights(PageRights)
    const [error, seterror] = useState(false)
    const [credentials, setCredentials] = useState({email: ''})
    const [options, setoptions] = useState([])
    const [users, setusers] = useState([])
    const [poste, setposte] = useState()

    async function getOptions(){
        setoptions(await getAllPostestravail())
    }

    async function getUsers(id){
        setusers(await getAllQualificationByIdPosteTravail(id))
    }

    useEffect(() => {
        getOptions()
    }, [])

    function onSelect(selectedList, selectedItem) {
        setposte(selectedItem)
        getUsers(selectedItem.id_poste_travail)
    }

    const handleChange =  (event) => {
        formHandleChange(event, credentials, setCredentials)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let userqualif = ""
        seterror(false)
        if(credentials.email !== "")
        {
            userqualif = await getUserByEmail(credentials.email)
            users.forEach(user => {
                if(user.email === credentials.email){
                    userqualif = null
                }
            });
            console.log(userqualif)
            console.log(credentials)
            console.log(poste)
            if(poste !== null && poste !== undefined && poste !== ""){
                if(userqualif !== null && userqualif !== undefined && userqualif !== ""){
                        insertQualification(userqualif.id_user, poste.id_poste_travail)
                        console.log('submit !')
                        toast.success("L'utilisateur a été ajouté a la liste des qualifiés")
                        getUsers()
                }         
                else{
                    seterror(true)
                } 
            }
            else {
                toast.warning("Vous avez oublié de selectionner un poste de travail")
            }  
        }else {
            seterror(true)
        }
    }
    return isAuthorized() && accessRights ?(
        <>
            <Nav/>
            <div className="container">
                <h1 className="text-center mt-3">Poste de Travail / Qualification</h1>
                <div className="row mt-5">
                    <div className="col-6 offset-3">
                        <p>Selectionner un poste :</p>
                        <Multiselect
                            options={options}
                            singleSelect={true}
                            placeholder="Poste de travail"
                            displayValue="label"
                            onSelect={onSelect}/>
                    </div>
                </div>
                <div className="row mt-5 border-bottom">
                    <h3>Utilisateurs Qualifiés :</h3>
                    <div className="col-3">
                        Email
                    </div>
                    <div className="col-3">
                        Action
                    </div>
                </div>
                {users.map((linkData, index) => {return <QualificationLine key={index} index={linkData.id_user} user={linkData}/>})}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserQualifiactionModal">Ajouter un utilisateur</button>
            </div>


            <div className="modal fade" id="addUserQualifiactionModal" tabIndex="-1" aria-labelledby="addUserQualificationModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addUserModalLabel">Ajouter un utilisateur qualifié</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                {
                                    error && (
                                    <div className="alert alert-dismissible alert-danger">
                                        <strong>Erreur </strong>L'utilisateur saisi n'existe pas ou est deja qualifié'
                                        <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="alert"></button>
                                    </div>
                                    )
                                }
                                
                                <InputLabel name="email" className="form-control my-3 p-2" value={credentials.email} change={handleChange} type="Email" label="Email" placeholder="mr.dupont@ping-pong.fr" required={true}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button id="btnAddUserQualif" type="submit" className="btn btn-primary">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </>
    ) : (
        <Redirect to='/'/>
    )
}
