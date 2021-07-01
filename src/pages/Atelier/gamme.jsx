import React, { useEffect, useState } from 'react'
import Nav from '../../components/header/nav'
import { Redirect } from 'react-router-dom';
import GammeLine from '../../components/atelier/gammeLine'
import { Multiselect } from 'multiselect-react-dropdown';
import InputLabel from '../../components/form/inputLabel'
import { getAllGamme, insertGamme } from '../../services/api/atelier/gammeapi'
import { getAllUser } from '../../services/api/admin/userapi'
import { formHandleChange } from '../../services/formService';
import { getAllPieceWithoutGamme } from '../../services/api/atelier/pieceapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthorized, verifyAccessRights } from '../../services/userService';

toast.configure()

export default function Gamme() {
    const PageRights = [5]
    const accessRights = verifyAccessRights(PageRights)
    const [gamme, setgamme] = useState({label: ""})
    const [gammes, setgammes] = useState([])
    const [optionsuser, setoptionsuser] = useState()
    const [optionspiece, setoptionspiece] = useState()
    const [user, setuser] = useState()
    const [piece, setpiece] = useState()

    async function getPiecesWithoutGamme(){
        setoptionspiece(await getAllPieceWithoutGamme())
    }

    async function getUsers(){
        setoptionsuser(await getAllUser())
    }

    async function getGammes(){
        setgammes(await getAllGamme())
    }

    function onSelectUser(selectedList, selectedItem){
        setuser(selectedItem)
    }

    function onSelectPiece(selectedList, selectedItem){
        setpiece(selectedItem)
    }

    const handleChangeAjouterGamme = (event) => {
        formHandleChange(event, gamme, setgamme)
    }

    const handleSubmitAjouterGamme = async (event) => {
        event.preventDefault()
        if(user !== undefined && piece !== undefined){
            await insertGamme(gamme.label, user.id_user, piece.id_piece)
            toast.success("La gamme a été ajoutée")
        }else{
            toast.warning("Veuillez remplir tous les champs")
        }
    }

    useEffect(() => {
        getGammes()
        getUsers()
        getPiecesWithoutGamme()
    }, [])
    return isAuthorized && accessRights ?(
        <>
            <Nav/>
            <div className="container">
                <h1 className="text-center mt-3">Gamme</h1>
                <div className="row mt-3">
                    <div className="col-3">
                        <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#addGammeModal">Ajouter une gamme</button>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-3">
                        <p style={{fontSize: "150%"}}>Gamme</p>
                    </div>
                    <div className="col-3">
                        <p style={{fontSize: "150%"}}>Responsable</p>
                    </div>
                    <div className="col-3">
                        <p style={{fontSize: "150%"}}>Piece Liée</p>
                    </div>
                    <div className="col-3">
                        <p style={{fontSize: "150%"}}>Options</p>
                    </div>
                </div>
                {gammes.map((linkData, index) => {return <GammeLine key={index} index={linkData.id_gamme} gamme={linkData}/>})}
            </div>

            <div className="modal fade" id="addGammeModal" tabIndex="-1" aria-labelledby="addGammeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addGammeModalLabel">Ajouter une gamme</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmitAjouterGamme}>
                            <div className="modal-body">                                
                                <div className="row mt-2">
                                    <InputLabel name="label" className="form-control my-3 p-2" value={gamme.label} change={handleChangeAjouterGamme} type="Text" label="Nom de la gamme" placeholder="Gamme" required={true} />
                                </div>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        Responsable de gamme :
                                    </div>
                                    <div className="col-6">
                                        <Multiselect
                                        options={optionsuser}
                                        singleSelect={true}
                                        placeholder="user"
                                        displayValue="email"
                                        onSelect={onSelectUser} />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                <div className="col-6">
                                        Piece Liée :
                                    </div>
                                    <div className="col-6">
                                        <Multiselect
                                        options={optionspiece}
                                        singleSelect={true}
                                        placeholder="piece"
                                        displayValue="reference"
                                        onSelect={onSelectPiece} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button id="btnAddGamme" type="submit" className="btn btn-primary">Enregistrer</button>
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
