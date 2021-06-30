import React, { useEffect, useState } from 'react'
import Nav from '../../components/header/nav'
import { getAllRealisations } from '../../services/api/atelier/realisation'
import HistoriqueRealisationLine from '../../components/atelier/historiqueRealisationLine'
import { isAuthorized, verifyAccessRights } from '../../services/userService'
import { Redirect } from 'react-router-dom'

export default function HistoriqueRealisation() {
    const PageRights = [2,5]
    const accessRights = verifyAccessRights(PageRights)
    const [realisations, setrealisations] = useState([])
    async function getRealisations(){
        setrealisations(await getAllRealisations())
    }
    useEffect(() => {
        getRealisations()
    }, [])

    return isAuthorized && accessRights ?(
        <>
            <Nav/>
            <div className="container">
                <h1 className="text-center mt-3">Historique des réalisations</h1>
                <div className="row mt-3">
                    <div className="col-4" style={{fontSize: "150%"}}>
                        Date
                    </div>
                    <div className="col-4" style={{fontSize: "150%"}}>
                        Gamme Lié
                    </div>
                    <div className="col-4" style={{fontSize: "150%"}}>
                        Listes des opérations
                    </div>
                </div>
                {realisations.map((linkData, index) => {return <HistoriqueRealisationLine key={index} realisation={linkData}/>})}
            </div>
        </>
    ) : (
        <Redirect to="/"/>
    )
}
