import React, { useEffect, useState } from 'react'
import Nav from '../../components/header/nav'
import { getAllPieces, insertPiece } from '../../services/api/atelier/pieceapi'
import PieceLine from '../../components/atelier/pieceLine'
import { isAuthorized, verifyAccessRights } from '../../services/userService'
import { Redirect } from 'react-router-dom'
import { formHandleChange } from '../../services/formService'
import InputLabel from '../../components/form/inputLabel'
import { getAllTypePiece } from '../../services/api/atelier/typepieceapi'
import { Multiselect } from 'multiselect-react-dropdown';
import { getAllFournisseur } from '../../services/api/atelier/fournisseurpieceapi'
import { getAllUser } from '../../services/api/admin/userapi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { insertGamme } from '../../services/api/atelier/gammeapi'

toast.configure()

export default function Piece() {
    const PageRights = [2,5]
    const accessRights = verifyAccessRights(PageRights)
    const [pieces, setpieces] = useState([])
    const [optionstype, setoptionstype] = useState()
    const [optionsfournisseur, setoptionsfournisseur] = useState()
    const [fournisseur, setfournisseur] = useState(null)
    const [piece, setpiece] = useState({reference: '', label: '', prix_achat: 0, prix_vente: 0 , id_stock_piece: 0})
    const [currenttype, setcurrenttype] = useState()
    
    
    async function getSetOptions(){
        setpieces(await getAllPieces())
        setoptionstype(await getAllTypePiece())
        setoptionsfournisseur(await getAllFournisseur())
    }

    const handleChange =  (event) => {
        formHandleChange(event, piece, setpiece)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let ifexist = false
        pieces.forEach(piecedata => {
            if(piecedata.reference === piece.reference){
                ifexist = true
            }            
        });
        if(ifexist === false){
            const id_piece = await insertPiece(piece.reference, piece.label, piece.prix_vente, piece.prix_achat, piece.id_stock_piece, currenttype, fournisseur)
            console.log("submit !")

        }else{
            toast.warning("Cette référence de pièce existe déjà")
        }
    }

    function onSelectFournisseur(selectedList, selectedItem){
        console.log(selectedItem)
        setfournisseur(selectedItem.id_fournisseur_piece)
    }

    function onSelectType(selectedList, selectedItem){
        console.log(selectedItem)
        setcurrenttype(selectedItem.id_type_piece)
    }

    useEffect(() => {
        getSetOptions()
    }, [])
    
    return isAuthorized() && accessRights ?(
        <>
            <Nav/>
            <div className="container">
                <h1 className="text-center mt-3">Liste des Pieces</h1>
                <div className="row mt-3">
                    <div className="col-3 offset">
                        <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#addPieceModal">Ajouter une piece</button>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-3">
                        Reference
                    </div>
                    <div className="col-3">
                        Type
                    </div>
                    <div className="col-4">
                        Label
                    </div>
                    <div className="col-2">
                        Informations
                    </div>
                </div>
                {pieces.map((linkData, index) => {return <PieceLine key={index} piece={linkData}/>})}
            </div>

            <div className="modal fade" id="addPieceModal" tabIndex="-1" aria-labelledby="addPieceLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addpieceLabel">Ajouter une piece</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                    <Multiselect
                                    options={optionstype}
                                    singleSelect={true}
                                    placeholder="Type de pièce"
                                    displayValue="label"
                                    onSelect={onSelectType}/>
                            {currenttype === 1 &&
                            <>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <InputLabel name="reference" className="form-control my-3 p-2" value={piece.reference} change={handleChange} type="Text" label="Reference" placeholder="PIECE0000" required={true} />
                                    </div>
                                    <div className="col-6">
                                        <InputLabel name="label" className="form-control my-3 p-2" value={piece.label} change={handleChange} type="Text" label="Label" placeholder="Piece" required={true} />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <InputLabel name="prix_vente" className="form-control my-3 p-2" value={piece.prix_vente} change={handleChange} type="Number" step="any" label="Prix de vente" placeholder="0.0" required={true} />
                                    </div>
                                </div>
                            </>
                            }
                            {currenttype === 2 &&
                            <>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <InputLabel name="reference" className="form-control my-3 p-2" value={piece.reference} change={handleChange} type="Text" label="Reference" placeholder="PIECE0000" required={true} />
                                    </div>
                                    <div className="col-6">
                                        <InputLabel name="label" className="form-control my-3 p-2" value={piece.label} change={handleChange} type="Text" label="label" placeholder="Piece" required={true} />
                                    </div>
                                </div>
                            </>
                            }
                            {currenttype === 3 &&
                            <>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <InputLabel name="reference" className="form-control my-3 p-2" value={piece.reference} change={handleChange} type="Text" label="Reference" placeholder="PIECE0000" required={true}/>
                                    </div>
                                    <div className="col-6">
                                        <InputLabel name="label" className="form-control my-3 p-2" value={piece.label} change={handleChange} type="Text" label="label" placeholder="Piece" required={true}/>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <InputLabel name="prix_achat" className="form-control my-3 p-2" value={piece.prix_achat} change={handleChange} type="Number" step="any" label="Prix d'achat" placeholder="0.0" required={true}/>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        Fournisseur :
                                    </div>
                                    <div className="col-6">
                                        <Multiselect
                                        options={optionsfournisseur}
                                        singleSelect={true}
                                        placeholder="fournisseur"
                                        displayValue="label"
                                        onSelect={onSelectFournisseur}/>
                                    </div>
                                </div>
                            </>
                            }
                            {currenttype === 4 &&
                            <>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <InputLabel name="reference" className="form-control my-3 p-2" value={piece.reference} change={handleChange} type="Text" label="Reference" placeholder="PIECE0000" required={true}/>
                                    </div>
                                    <div className="col-6">
                                        <InputLabel name="label" className="form-control my-3 p-2" value={piece.label} change={handleChange} type="Text" label="label" placeholder="Piece" required={true}/>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <InputLabel name="prix_vente" className="form-control my-3 p-2" value={piece.prix_vente} change={handleChange} type="Number" step="any" label="Prix de vente" placeholder="0.0" required={true}/>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        Fournisseur :
                                    </div>
                                    <div className="col-6">
                                        <Multiselect
                                        options={optionsfournisseur}
                                        singleSelect={true}
                                        placeholder="fournisseur"
                                        displayValue="label"
                                        onSelect={onSelectFournisseur}/>
                                    </div>
                                </div>
                            </>
                            }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button id="btnAddPiece" type="submit" className="btn btn-primary">Enregistrer</button>
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
