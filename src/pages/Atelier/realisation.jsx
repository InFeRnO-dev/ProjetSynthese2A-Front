import React, { useEffect, useState } from 'react'
import Nav from '../../components/header/nav'
import { Multiselect } from 'multiselect-react-dropdown';
import { Redirect, Link } from 'react-router-dom'
import { getAllGamme } from '../../services/api/atelier/gammeapi';
import { getGammeOperationByIdGamme } from '../../services/api/atelier/gammeoperation';
import OperationLine from '../../components/atelier/operationLine';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllMachinesByIdPosteTravail, getPosteMachineById } from '../../services/api/atelier/postemachineapi';
import InputLabel from '../../components/form/inputLabel';
import { formHandleChange } from '../../services/formService';
import { getAllPostestravail } from '../../services/api/atelier/postetravailapi';
import { insertOperation } from '../../services/api/atelier/operationapi';
import { insertRealisation } from '../../services/api/atelier/realisation';
import { insertRealisationOperation } from '../../services/api/atelier/realisationoperation';
import { isAuthorized, verifyAccessRights } from '../../services/userService';
toast.configure()

export default function Realisation() {
    const PageRights = [2,5]
    const accessRights = verifyAccessRights(PageRights)
    const [button, setbutton] = useState(false)
    const [optionsgamme, setoptionsgamme] = useState()
    const [optionspostetravail, setoptionspostetravail] = useState()
    const [optionsmachine, setoptionsmachine] = useState()
    const [gamme, setgamme] = useState()
    const [poste, setposte] = useState()
    const [machine, setmachine] = useState()
    const [operations, setoperations] = useState([])
    const [operationsTemporaires, setoperationsTemporaires] = useState([])
    const [operation, setoperation] = useState({label: "", id_poste_machine: 0, poste_travail: "", machine: "", temps_travail: 0})


    function getAll(){
        getPosteTravail()
        getGamme()
    }

    async function getOperations(id_gamme){
        setoperations(await getGammeOperationByIdGamme(id_gamme) )
    }

    async function getGamme(){
        setoptionsgamme(await getAllGamme())
    }

    async function getMachine(id){
        setoptionsmachine(await getAllMachinesByIdPosteTravail(id))
    }

    async function getPosteTravail(){
        setoptionspostetravail(await getAllPostestravail())
    }

    async function getPosteMachine(id_poste_travail, id_machine){
        const poste_machine = await getPosteMachineById(id_poste_travail,id_machine)
        setoperation({
            ...operation, ['id_poste_machine']: poste_machine.id_poste_machine
        })
    }

    async function idOperation(operationsTemporaires){
        let idTab = []
        for (let i = 0; i < operationsTemporaires.length; i++) {
            idTab.push((await insertOperation(operationsTemporaires[i])).rows[0])
        }
        return idTab
    }

    function onSelectPostetravail(selectedList, selectedItem) {
        console.log(selectedItem)
        setposte(selectedItem)
        getMachine(selectedItem.id_poste_travail)
    }

    function onSelectMachine(selectedList, selectedItem) {
        console.log(selectedItem)
        setmachine(selectedItem)
        getPosteMachine(poste.id_poste_travail, selectedItem.id_machine)
    }

    function onSelectGamme(selectedList, selectedItem) {
        console.log(selectedItem)
        setgamme(selectedItem) 
        getOperations(selectedItem.id_gamme)
    }

    const handleChange =  (event) => {
        formHandleChange(event, operation, setoperation)
    }

    const handleSubmitAjouterOperation = (event) => {
        event.preventDefault()
        if(operation.id_poste_machine !== 0){
            console.log(poste.label , machine.label)
                operation.poste_travail = poste.label
                operation.machine = machine.label
                operationsTemporaires.push(operation)
                toast.success("l'opération a bien été ajoutée")
                getAll()
        }
        else{
            toast.warning("Le poste de travail ou la machine n'a pas été sélectionné")
        }
    }

    async function onClick(){
        const id_realisation = (await insertRealisation(gamme.id_gamme)).rows[0].id_realisation
        let idTab = []
        if(operationsTemporaires !== null && operationsTemporaires !== undefined && operationsTemporaires !== []) {
            idTab = await idOperation(operationsTemporaires)
        }
        else {
            console.log("Pas d'opération temporaire")
        }
        
        operations.forEach(async link => {
            await insertRealisationOperation(id_realisation, link.id_operation)            
        });

        if(idTab !== null && idTab !== undefined && idTab !== []){
            console.log("boucle if")
            for (let i = 0; i < idTab.length; i++) {
                await insertRealisationOperation(id_realisation, idTab[i].id_operation)
            }
        }
        else{
            console.log("aucune opération")
        }
        toast.success("La réalisation a été ajoutée")
    }

    useEffect(() => {
        getAll()
    }, [operationsTemporaires])

    return isAuthorized && accessRights ?(
        <>
            <Nav/>
            <div className="container">
                <h1 className="text-center mt-3">Réalisations</h1>
                <div className="row mt-3">
                    <div className="col-3">
                        <button onClick={() => setbutton(true)} className="btn btn-info">Ajouter une réalisation</button>
                    </div>
                    <div className="col-3 offset-6">
                        <Link to={{pathname:"/atelier/realisation/historique"}}><button className="btn btn-secondary">Historique des Réalisations</button></Link>
                    </div>
                </div>
                {button &&
                    <>
                        <div className="row mt-3">
                            <div className="col-3">
                                Selection d'une gamme :
                            </div>
                            <div className="col-4">
                                <Multiselect
                                options={optionsgamme}
                                emptyRecordMsg="Aucune gamme"
                                singleSelect={true}
                                placeholder="Gamme"
                                displayValue="label"
                                onSelect={onSelectGamme}/>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-3" style={{fontSize: "150%"}}>
                                Label
                            </div>
                            <div className="col-3" style={{fontSize: "150%"}}>
                                Poste de travail
                            </div>
                            <div className="col-3" style={{fontSize: "150%"}}>
                                Machine
                            </div>
                            <div className="col-3" style={{fontSize: "150%"}}>
                                Temps de travail
                            </div>
                        </div>
                        {operations.map((linkData, index) => {return <OperationLine key={index} operation={linkData}/>})}
                        {operationsTemporaires.map((linkData, index) => {return <OperationLine key={index} operation={linkData}/>})}
                        <div className="row mt-3">
                            <div className="col-3">
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addOperationModal">Ajouter une operation</button>
                            </div>
                            <div className="col-3 offset-6">
                                <button onClick={() => onClick()} type="button" className="btn btn-success">Valider la réalisation</button>
                            </div>
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
                                                        onSelect={onSelectPostetravail} />
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
                                                        onSelect={onSelectMachine} />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-5">
                                                    <InputLabel name="label" className="form-control my-3 p-2" value={operation.label} change={handleChange} type="Text" label="Label" placeholder="Operation" required={true} />
                                                </div>
                                                <div className="col-7">
                                                    <InputLabel name="temps_travail" className="form-control my-3 p-2" value={operation.temps_travail} change={handleChange} type="Number" label="Temps de travail(s)" placeholder="100" required={true} />
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
                }
            </div>
        </>
    ) : (
        <Redirect to="/"/>
    )
}
