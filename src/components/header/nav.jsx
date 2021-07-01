import React from 'react'
import { JWTDecode } from '../../services/api/admin/userapi'

export default function Nav() {
    const userRights = JWTDecode().login.droits
    
    const getDroitAdmin = (userRights) => {
        let bool = false
        for (let i = 0; i < userRights.length; i++) {
            if(userRights[i] === 1){
                return true
            }
        }
        return bool
    }
    const getDroitAtelier = (userRights) => {
        let bool = false
        for (let i = 0; i < userRights.length; i++) {
            if(userRights[i] === 2){
                return true
            }
        }
        return bool
    }
    const getDroitCommercial = (userRights) => {
        let bool = false
        for (let i = 0; i < userRights.length; i++) {
            if(userRights[i] === 3){
                return true
            }
        }
        return bool
    }
    const getDroitComptabilite = (userRights) => {
        let bool = false
        for (let i = 0; i < userRights.length; i++) {
            if(userRights[i] === 4){
                return true
            }
        }
        return bool
    }
    const getDroitResponsableAtelier = (userRights) => {
        let bool = false
        for (let i = 0; i < userRights.length; i++) {
            if(userRights[i] === 5){
                return true
            }
        }
        return bool
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <img style={{width: "5%", height:"5%"}} src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/10870.png"/>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        {getDroitAdmin(userRights) &&
                            <li className="nav-item">
                                <a className="nav-link" href="/admin">Admin</a>
                            </li>
                        }
                        {getDroitAtelier(userRights) &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Atelier
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a className="dropdown-item" href="/atelier/piece">Pièces</a></li>
                                    <li><a className="dropdown-item" href="/atelier/operation">Operation</a></li>
                                    <li><a className="dropdown-item" href="/atelier/realisation">Realisation</a></li>
                                </ul>
                            </li>
                        }
                        {getDroitResponsableAtelier(userRights) &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Responsable Atelier
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a className="dropdown-item" href="/atelier/fabrication/machine">Machine</a></li>
                                    <li><a className="dropdown-item" href="/atelier/fabrication/qualification">Qualification</a></li>
                                    <li><a className="dropdown-item" href="/atelier/gamme">Gamme</a></li>
                                    <li><a className="dropdown-item" href="/atelier/piece">Pièces</a></li>
                                    <li><a className="dropdown-item" href="/atelier/operation">Operation</a></li>
                                    <li><a className="dropdown-item" href="/atelier/composition">Composition</a></li>
                                    <li><a className="dropdown-item" href="/atelier/realisation">Realisation</a></li>
                                </ul>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
