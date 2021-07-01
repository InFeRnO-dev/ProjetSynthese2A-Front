import React, { useEffect, useState } from 'react'
import Nav from '../../components/header/nav'
import { Redirect } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';
import { getAllTypePieceWithoutLivrable } from '../../services/api/atelier/typepieceapi';
import { getAllPieceByType } from '../../services/api/atelier/pieceapi';
import InputLabel from '../../components/form/inputLabel';
import CompositionLine from '../../components/atelier/compositionLine';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateStockPiece } from '../../services/api/atelier/stockpieceapi';
import { getCompositionByIdPieceCree, insertComposition } from '../../services/api/atelier/compositionapi';
import { isAuthorized, verifyAccessRights } from '../../services/userService';

toast.configure()

export default function Composition() {
    const PageRights = [5]
    const accessRights = verifyAccessRights(PageRights)
    const [optionstypepiece, setoptionstypepiece] = useState()
    const [typepiece, settypepiece] = useState()
    const [optionspiecebase, setoptionspiecebase] = useState()
    const [optionspiece, setoptionspiece] = useState()
    const [piece, setpiece] = useState()
    const [piecebase, setpiecebase] = useState()
    const [composition, setcomposition] = useState({id_piece_cree: 0, id_piece_composition: 0, label:"", id_stock_piece:0, stock: 0, quantite: 0})
    const [compositions, setcompositions] = useState([])

    async function getTypePiece(){
        setoptionstypepiece(await getAllTypePieceWithoutLivrable())
    }

    async function getPieceByType(id_type_piece){
        setoptionspiece(await getAllPieceByType(id_type_piece))
    }

    async function getPieceByTypeBase(){
        setoptionspiecebase(await getAllPieceByType(1))
    }

    async function getCompositions(id_piece){
        setcompositions(await getCompositionByIdPieceCree(id_piece))
    }

    function onSelectPieceBase(selectedList, selectedItem){
        setpiecebase(selectedItem)
        getCompositions(selectedItem.id_piece)
    }

    function onSelectTypePiece(selectedList, selectedItem) {
        console.log(selectedItem)
        settypepiece(selectedItem)
        getPieceByType(selectedItem.id_type_piece)
    }

    function onSelectPiece(selectedList, selectedItem) {
        console.log(selectedItem)
        setpiece(selectedItem)
    }

    const handleChange =  (event) => {
        const value = event.currentTarget.value * 1
        const name = event.currentTarget.name
        setcomposition({...composition, [name]: value})
    }

    const handleSubmit = async () => {
        if(typepiece !== null && typepiece !== undefined && piece !== null && piece !== undefined && piecebase !== null && piecebase !== undefined){
            composition.id_piece_cree = piecebase.id_piece
            composition.id_piece_composition = piece.id_piece
            composition.id_stock_piece = piece.id_stock_piece
            composition.stock = piece.stock
            composition.label = piece.label
            await insertComposition(composition)
            toast.success("La piece a été ajoutée a la composition")
        }else {
            toast.warning("Veuillez saisir tous les champs")
        }
    }

    useEffect(() => {
        getTypePiece()
        getPieceByTypeBase()
    }, [])
    return isAuthorized && accessRights ?(
        <>
            <Nav/>
            <div className="container">
                <h1 className="text-center mt-3">Composition</h1>
                <div className="row mt-5">
                    <div className="col-4">
                        <p>Piece à composer: </p>
                    </div>
                    <div className="col-5">
                        <Multiselect
                        options={optionspiecebase}
                        emptyRecordMsg="Aucun type de piece"
                        singleSelect={true}
                        placeholder="Piece"
                        displayValue="label"
                        onSelect={onSelectPieceBase}/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4">
                        <p>Type de piece: </p>
                    </div>
                    <div className="col-5">
                        <Multiselect
                        options={optionstypepiece}
                        emptyRecordMsg="Aucun type de piece"
                        singleSelect={true}
                        placeholder="Type de piece"
                        displayValue="label"
                        onSelect={onSelectTypePiece}/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4">
                        <p>Piece: </p>
                    </div>
                    <div className="col-5">
                        <Multiselect
                        options={optionspiece}
                        emptyRecordMsg="Aucun piece"
                        singleSelect={true}
                        placeholder="piece"
                        displayValue="label"
                        onSelect={onSelectPiece}/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-5 offset-4">
                        <InputLabel name="quantite" className="form-control my-3 p-2" value={composition.quantite} change={handleChange} type="Number" label="Quantite" placeholder="Quantite" required={true}/>  
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-3">
                        Reference
                    </div>
                    <div className="col-3">
                        Label
                    </div>
                    <div className="col-3">
                        Quantité
                    </div>
                    <div className="col-3">
                        Options
                    </div>
                </div>
                {compositions.map((linkData, index) => {return <CompositionLine key={index} composition={linkData}/>})}
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Ajouter la piece</button>
            </div>
        </>
    ) : (
        <Redirect to="/"/>
    )
}
