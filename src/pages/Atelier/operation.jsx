import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import Nav from '../../components/header/nav'
import { getAllOperations, insertOperation } from '../../services/api/atelier/operationapi'
import OperationLine from '../../components/atelier/operationLine'
import { isAuthorized, verifyAccessRights } from '../../services/userService'
import { formHandleChange } from '../../services/formService'
import InputLabel from '../../components/form/inputLabel'
import { Multiselect } from 'multiselect-react-dropdown';
import { getAllPostestravail } from '../../services/api/atelier/postetravailapi'
import { getAllMachinesByIdPosteTravail, getPosteMachineById } from '../../services/api/atelier/postemachineapi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllGamme } from '../../services/api/atelier/gammeapi'
import { insertGammeOperation } from '../../services/api/atelier/gammeoperation'

toast.configure()

export default function Operation() {
    const PageRights = [2,5]
    const accessRights = verifyAccessRights(PageRights)
    const [operations, setoperations] = useState([])
    const [operation, setoperation] = useState({label: "", id_poste_machine: 0, temps_travail: 0})
    const [optionspostetravail, setoptionspostetravail] = useState()
    const [optionsmachine, setoptionsmachine] = useState()
    const [optionsgamme, setoptionsgamme] = useState()
    const [poste, setposte] = useState()
    const [gamme, setgamme] = useState()

    function getAll(){
        getOperations()
        getPosteTravail()
        getGamme()
    }

    async function getGamme(){
        setoptionsgamme(await getAllGamme())
    }

    async function getOperations(){
        setoperations(await getAllOperations())
    }

    async function getPosteTravail(){
        setoptionspostetravail(await getAllPostestravail())
    }

    async function getMachine(id){
        setoptionsmachine(await getAllMachinesByIdPosteTravail(id))
    }

    async function getPosteMachine(id_poste_travail, id_machine){
        const poste_machine = await getPosteMachineById(id_poste_travail,id_machine)
        setoperation({
            ...operation, ['id_poste_machine']: poste_machine.id_poste_machine
        })
    }

    function onSelectPostetravail(selectedList, selectedItem) {
        console.log(selectedItem)
        setposte(selectedItem)
        getMachine(selectedItem.id_poste_travail)
    }

    function onSelectMachine(selectedList, selectedItem) {
        console.log(selectedItem)
        getPosteMachine(poste.id_poste_travail, selectedItem.id_machine)
    }

    function onSelectGamme(selectedList, selectedItem) {
        console.log(selectedItem)
        setgamme(selectedItem)   
    }

    const handleChange =  (event) => {
        formHandleChange(event, operation, setoperation)
    }

    const handleSubmitAjouterOperation = async (event) => {
        event.preventDefault()
        console.log(operation)
        if(operation.id_poste_machine !== 0){
            if(gamme !== null && gamme !== undefined && gamme !== ""){
                const id_operation = await insertOperation(operation)
                console.log(id_operation.rows[0].id_operation)
                toast.success("l'opération a bien été ajoutée")
                insertGammeOperation(gamme.id_gamme, id_operation.rows[0].id_operation)
            }else{
                toast.warning("La gamme n'a pas été selectionné")
            }
        }
        else{
            toast.warning("Le poste de travail ou la machine n'a pas été sélectionné")
        }
    }

    useEffect(() => {
        getAll()
    }, [])

    return isAuthorized && accessRights ?(
        <>
            <Nav/>
            <div className="container">
                <h1 className="text-center mt-3">Liste des opérations</h1>
                <div className="row mt-3">
                    <div className="col-3">
                        <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#addOperationModal">Ajouter une operation</button>
                    </div>
                </div>
                <div className="row border-bottom mt-3">
                    <div className="col-3">
                        Label
                    </div>
                    <div className="col-3">
                        Poste de travail
                    </div>
                    <div className="col-3">
                        Machine necessaire
                    </div>
                    <div className="col-3">
                        Temps de travail
                    </div>
                </div>
                {operations.map((linkData, index) => {return <OperationLine key={index} operation={linkData}/>})}
            </div>


            <div className="modal fade" id="addOperationModal" tabIndex="-1" aria-labelledby="addOperationModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addOperationModalLabel">Ajouter une opération</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmitAjouterOperation}>
                            <div className="modal-body">                                
                                <div className="row">
                                    <div className="col-4">
                                        Poste de travail:
                                    </div>
                                    <div className="col-8">
                                        <Multiselect
                                        options={optionspostetravail}
                                        emptyRecordMsg="Aucun poste de travail"
                                        singleSelect={true}
                                        placeholder="Poste de travail"
                                        displayValue="label"
                                        onSelect={onSelectPostetravail}/>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-4">
                                        Machine :
                                    </div>
                                    <div className="col-8">
                                        <Multiselect
                                        options={optionsmachine}
                                        emptyRecordMsg="Aucune machine"
                                        singleSelect={true}
                                        placeholder="Machine"
                                        displayValue="label"
                                        onSelect={onSelectMachine}/>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-5">
                                        <InputLabel name="label" className="form-control my-3 p-2" value={operation.label} change={handleChange} type="Text" label="Label" placeholder="Operation" required={true}/>
                                    </div>
                                    <div className="col-7">
                                        <InputLabel name="temps_travail" className="form-control my-3 p-2" value={operation.temps_travail} change={handleChange} type="Number" label="Temps de travail(s)" placeholder="100" required={true}/>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-4">
                                        Gamme Liée :
                                    </div>
                                    <div className="col-8">
                                        <Multiselect
                                        options={optionsgamme}
                                        emptyRecordMsg="Aucune gamme"
                                        singleSelect={true}
                                        placeholder="Gamme"
                                        displayValue="label"
                                        onSelect={onSelectGamme}/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button id="btnAddOperation" type="submit" className="btn btn-primary">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    ) : (
        <Redirect to="/"/>
    )
}
