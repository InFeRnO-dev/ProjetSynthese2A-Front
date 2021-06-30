import React, { useEffect, useState } from 'react'
import Nav from '../../components/header/nav'
import { getGammeByIdPiece } from '../../services/api/atelier/gammeapi'
import { Link } from 'react-router-dom'
import { isAuthorized, verifyAccessRights } from '../../services/userService'
import { Redirect } from 'react-router-dom'

export default function ShowPiece(props) {
    const PageRights = [2,5]
    const accessRights = verifyAccessRights(PageRights)
    const [gamme, setgamme] = useState()
    async function getGamme(){
        if(props.location.state.piece.gamme !== null){
            setgamme(await getGammeByIdPiece(props.location.state.piece.id_piece))
        }    
    }

    useEffect(() => {
        getGamme()
    }, [])
    return isAuthorized && accessRights ?(
        <>
            <Nav/>
            <h1 className="text-center mt-3">Detail de la pièce</h1>
            <div className="container">
                <div className="row mt-5">
                    <p><b className="m-5" style={{fontSize: "140%"}}>Label:</b> <i className="m-5" style={{fontSize: "120%"}}>{props.location.state.piece.label}</i></p>
                </div>
                <div className="row mt-2">
                    <p><b className="m-5" style={{fontSize: "140%"}}>Fournisseur:</b> <i className="m-5" style={{fontSize: "120%"}}>{props.location.state.piece.fournisseur}</i></p>
                </div>
                <div className="row mt-2">
                    <p><b className="m-5" style={{fontSize: "140%"}}>Reference:</b> <i className="m-5" style={{fontSize: "120%"}}>{props.location.state.piece.reference}</i></p>
                </div>
                <div className="row mt-2">
                    <p><b className="m-5" style={{fontSize: "140%"}}>Type:</b> <i className="m-5" style={{fontSize: "120%"}}>{props.location.state.piece.type}</i></p>
                </div>
                <div className="row mt-2">
                    <p><b className="m-5" style={{fontSize: "140%"}}>Prix de vente:</b> <i className="m-5" style={{fontSize: "120%"}}>{props.location.state.piece.prix_vente}</i></p>
                </div>
                <div className="row mt-2">
                    <p><b className="m-5" style={{fontSize: "140%"}}>Prix d'achat:</b> <i className="m-5" style={{fontSize: "120%"}}>{props.location.state.piece.prix_achat}</i></p>
                </div>
                <div className="row mt-2">
                    <p><b className="m-5" style={{fontSize: "140%"}}>Stock:</b> <i className="m-5" style={{fontSize: "120%"}}>{props.location.state.piece.stock}</i></p>
                </div>
                {props.location.state.piece.gamme !== null &&
                    <div className="row mt-2">
                        <div className="col offset-2">
                            <Link to={{pathname: `/atelier/gamme/${props.location.state.piece.gamme}`, state: {gamme: gamme}}}><button className="btn btn-primary">Voir la gamme associée a cette pièce</button></Link>
                        </div>
                        <div className="col offset">
                        <Link to={{pathname: `/atelier/composition/${props.location.state.piece.id_piece}`, state: {piece: props.location.state.piece}}}><button className="btn btn-primary">Voir la composition associée a cette pièce</button></Link>
                        </div>
                    </div>
                }                
            </div>
        </>
    ) : (
        <Redirect to="/"/>
    )
}
