import React, { useEffect, useState } from 'react'
import Nav from '../../components/header/nav'
import { Redirect } from 'react-router-dom'
import { getCompositionByIdPieceCree } from '../../services/api/atelier/compositionapi'
import ShowCompositionLine from '../../components/atelier/showCompositionLine'
import { isAuthorized, verifyAccessRights } from '../../services/userService'

export default function Showcomposition(props) {
    const PageRights = [2,5]
    const accessRights = verifyAccessRights(PageRights)
    const [compositions, setcompositions] = useState([])

    async function getCompositions(){
        setcompositions(await getCompositionByIdPieceCree(props.location.state.piece.id_piece))
    }
    
    useEffect(() => {
        getCompositions()
    }, [])
    return isAuthorized && accessRights ?(
        <>
            <Nav/>
            <div className="container">
                <h1 className="text-center mt-3">Composition de la piece {props.location.state.piece.label}</h1>
                <div className="row mt-5">
                    <div className="col-4">
                        <p style={{fontSize: "150%"}}>Reference</p>
                    </div>
                    <div className="col-4">
                        <p style={{fontSize: "150%"}}>Label</p>
                    </div>
                    <div className="col-4">
                        <p style={{fontSize: "150%"}}>Quantité</p>
                    </div>
                </div>
                {compositions.map((linkData, index) => {return <ShowCompositionLine key={index} composition={linkData}/>})}
            </div>

        </>
    ) : (
        <Redirect to="/"/>
    )
}
