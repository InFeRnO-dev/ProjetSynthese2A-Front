import React from 'react'
import Nav from '../../components/header/nav'
import { isAuthorized, verifyAccessRights } from '../../services/userService'
import { Redirect } from 'react-router-dom'

export default function Gamme(props) {
    const PageRights = [2,5]
    const accessRights = verifyAccessRights(PageRights)
    return isAuthorized && accessRights ?(
        <>
            <Nav/>
            <h1 className="text-center mt-3">Gamme</h1>
            <div className="container">
                <div className="row mt-5">
                    <p><b className="m-5" style={{fontSize: "140%"}}>Libelle de la gamme:</b> <i className="m-5" style={{fontSize: "120%"}}>{props.location.state.gamme.label}</i></p>
                    <p><b className="m-5" style={{fontSize: "140%"}}>Responsable de la gamme:</b> <i className="m-5" style={{fontSize: "120%"}}>{props.location.state.gamme.email}</i></p>
                </div>
            </div>
        </>
    ) : (
        <Redirect to="/"/>
    )
}
