import React, { useEffect, useState } from 'react'
import Nav from '../../components/header/nav'
import { Multiselect } from 'multiselect-react-dropdown';
import { getAllPostestravail, insertPosteTravail } from '../../services/api/atelier/postetravailapi';
import { formHandleChange } from '../../services/formService';
import InputLabel from '../../components/form/inputLabel';
import { getAllMachinesByIdPosteTravail, getAllMachinesWithoutPosteTravail, insertPosteMachine } from '../../services/api/atelier/postemachineapi';
import MachineLine from '../../components/atelier/machineLine';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { insertMachine } from '../../services/api/atelier/machineapi';


toast.configure()

export default function Machine() {
    const PageRights = [1]
    //const accessRights = verifyAccessRights(PageRights)
    const [error, seterror] = useState(false)
    const [credentials, setcredentials] = useState({label: ''})
    const [optionsposte, setoptionsposte] = useState()
    const [optionsmachine, setoptionsmachine] = useState()
    const [poste, setposte] = useState()
    const [machines, setmachines] = useState([])
    const [machine, setmachine] = useState()

    async function getOptionsPoste(){
        setoptionsposte(await getAllPostestravail())
    }

    async function getOptionsMachine(){
        setoptionsmachine(await getAllMachinesWithoutPosteTravail())
    }

    async function getMachine(id){
        setmachines(await getAllMachinesByIdPosteTravail(id))
    }

    useEffect(() => {
        getOptionsPoste()
        getOptionsMachine()
    }, [])

    function onSelectPoste(selectedList, selectedItem) {
        setposte(selectedItem)
        getMachine(selectedItem.id_poste_travail)
    }

    function onSelectMachine(selectedList, selectedItem) {
        console.log(selectedItem)
        setmachine(selectedItem)
    }

    const handleChange =  (event) => {
        formHandleChange(event, credentials, setcredentials)
    }

    const handleSubmitAjouterPoste = async (event) => {
        event.preventDefault()
        const postesTravail = await getAllPostestravail()
        let label = credentials.label
        seterror(false)
        if(label !== ""){
            postesTravail.forEach(posteTravail => {
                if(posteTravail.label === label){
                    label = null
                } 
            });
            console.log(label)
            if(label !== null && label !== undefined && label !== ""){
                insertPosteTravail(label)
                toast.success("Le poste de travail a été ajouté")
                console.log("submit !")
            }else {
                seterror(true)
            }
        }else {
            seterror(true)
        }
    }

    const handleSubmitAjouterMachine = async (event) => {
        event.preventDefault()
        if(credentials.label !== "") {
                insertMachine(credentials.label)
                toast.success("La machine a été ajouté")
                console.log("submit !")
        }
    }

    const handleSubmitAjouterMachinePoste = async (event) => {
        event.preventDefault()
        if(poste !== undefined && poste !== null){
            if(machine !== undefined && machine !== null) {
                insertPosteMachine(poste.id_poste_travail, machine.id_machine)
                toast.success("La machine a été ajouté a ce poste de travail")
                console.log("submit !")
            }else {
                toast.warning("Aucune machine sélectionnée")
            }  
        }else {
            toast.warning("Aucun poste de travail sélectionné")
        }
    }

    return (
        <>
            <Nav/>
            <div className="container">
                <h1 className="text-center mt-3">Poste de Travail / Machine</h1>
                <div className="row mt-5">
                    <div className="col-3 offset-2">
                    <p>Selectionner un poste :</p>
                    </div>
                    <div className="col-5">
                        <Multiselect
                            options={optionsposte}
                            singleSelect={true}
                            placeholder="Poste de travail"
                            displayValue="label"
                            onSelect={onSelectPoste}/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-3 offset-3">
                        <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#addPosteTravailModal">Ajouter un poste de travail</button>
                    </div>
                    <div className="col-3">
                        <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#addMachineModal">Ajouter une machine</button>
                    </div>
                </div>
                <div className="row mt-5 border-bottom">
                    <h3>Machines :</h3>
                    <div className="col-3">
                        Label
                    </div>
                    <div className="col-3">
                        Action
                    </div>
                </div>
                {machines.map((linkData, index) => {return <MachineLine key={index} index={linkData.id_machine} poste={poste} machine={linkData}/>})}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addSelectMachineModal">Ajouter une machine au poste de travail</button>
            </div>

            <div className="modal fade" id="addPosteTravailModal" tabIndex="-1" aria-labelledby="addPosteTravailModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addUserModalLabel">Ajouter un poste de travail</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmitAjouterPoste}>
                            <div className="modal-body">
                                {
                                    error && (
                                    <div className="alert alert-dismissible alert-danger">
                                        <strong>Erreur </strong>Le poste de travail existe deja
                                        <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="alert"></button>
                                    </div>
                                    )
                                }
                                
                                <InputLabel name="label" className="form-control my-3 p-2" value={credentials.label} change={handleChange} type="Text" label="Label" placeholder="Poste de travail" required={true}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button id="btnAddPosteTavail" type="submit" className="btn btn-primary">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addMachineModal" tabIndex="-1" aria-labelledby="addMachineModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addUserModalLabel">Ajouter une machine</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmitAjouterMachine}>
                            <div className="modal-body">                                
                                <InputLabel name="label" className="form-control my-3 p-2" value={credentials.label} change={handleChange} type="Text" label="Label" placeholder="Machine" required={true}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button id="btnAddMachine" type="submit" className="btn btn-primary">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addSelectMachineModal" tabIndex="-1" aria-labelledby="addSelectMachineModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addUserModalLabel">Ajouter une machine</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmitAjouterMachinePoste}>
                            <div className="modal-body">                                
                                <Multiselect
                                options={optionsmachine}
                                emptyRecordMsg="Aucune machine n'est libre"
                                singleSelect={true}
                                placeholder="Machine"
                                displayValue="label"
                                onSelect={onSelectMachine}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button id="btnAddMachinePoste" type="submit" className="btn btn-primary">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        </>
    )
}
