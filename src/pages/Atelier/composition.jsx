import React, { useEffect, useState } from 'react'
import Nav from '../../components/header/nav'
import { Redirect } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';
import { getAllTypePiece } from '../../services/api/atelier/typepieceapi';
import { getAllPieceByType } from '../../services/api/atelier/pieceapi';
import InputLabel from '../../components/form/inputLabel';
import { formHandleChange } from '../../services/formService';
import CompositionLine from '../../components/atelier/compositionLine';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateStockPiece } from '../../services/api/atelier/stockpieceapi';
import { insertComposition } from '../../services/api/atelier/compositionapi';
import { isAuthorized, verifyAccessRights } from '../../services/userService';

toast.configure()

export default function Composition(props) {
    const PageRights = [2,5]
    const accessRights = verifyAccessRights(PageRights)
    const id_piece_cree = props.location.state.piece.id_piece
    const [optionstypepiece, setoptionstypepiece] = useState()
    const [typepiece, settypepiece] = useState()
    const [optionspiece, setoptionspiece] = useState()
    const [piece, setpiece] = useState()
    const [composition, setcomposition] = useState({id_piece_cree: id_piece_cree, id_piece_composition: 0, label:"", id_stock_piece:0, stock: 0, quantite: 0})
    const [compositions, setcompositions] = useState([])
    const [map, setmap] = useState()

    async function getTypePiece(){
        setoptionstypepiece(await getAllTypePiece())
    }

    async function getPieceByType(id_type_piece){
        setoptionspiece(await getAllPieceByType(id_type_piece))
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

    const setDataComposition = () => {
        compositions.push(composition)
    }

    function AjouterPieceRealisation(){
        if(typepiece !== null && typepiece !== undefined && piece !== null && piece !== undefined){
            composition.id_piece_composition = piece.id_piece
            composition.id_stock_piece = piece.id_stock_piece
            composition.stock = piece.stock
            composition.label = piece.label
            console.log(composition)
            setDataComposition()
            console.log(compositions)
        }else {
            console.log("undefined")
        }
    }

    const handleSubmit = async () => {
        if(compositions !== null && compositions !== undefined && compositions.length !== 0){
            compositions.forEach(async compo => {
                let stock = compo.stock - compo.quantite
                await insertComposition(compo.id_piece_cree, compo.id_piece_composition, compo.quantite)
                await updateStockPiece(compo.id_stock_piece, stock)
            });
            await updateStockPiece(id_piece_cree, (props.location.state.piece.stock + 1))
            toast.success("Composition ajoutée")
            props.history.push("/atelier/piece")
        }else {
            toast.warning("Veuillez saisir une pièce")
        }
    }

    useEffect(() => {
        getTypePiece()
    }, [setDataComposition])
    return isAuthorized && accessRights ?(
        <>
            <Nav/>
            <div className="container">
                <h1 className="text-center mt-3">Composition</h1>
                <div className="row mt-5">
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
                    {piece!== undefined &&
                        <div className="col-3">
                            <p>Stock : {piece.stock}</p>
                        </div>
                    }
                </div>
                <div className="row mt-3">
                    <div className="col-5 offset-4">
                        <InputLabel name="quantite" className="form-control my-3 p-2" value={composition.quantite} change={handleChange} type="Number" label="Quantite" placeholder="Quantite" required={true}/>  
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-5 offset-10">
                        <button type="button" className="btn btn-primary" onClick={() => AjouterPieceRealisation()}>Ajouter la piece</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        Label
                    </div>
                    <div className="col-4">
                        Quantité
                    </div>
                </div>
                {compositions.map((linkData, index) => {return <CompositionLine key={index} composition={linkData}/>})}
                <button type="button" className="btn btn-success" onClick={handleSubmit}>Valider la composition</button>
            </div>
        </>
    ) : (
        <Redirect to="/"/>
    )
}
