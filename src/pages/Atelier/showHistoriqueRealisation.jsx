import React, { useEffect, useState } from 'react'
import { getRealisationOperationByIdRealisation } from '../../services/api/atelier/realisationoperation'
import ShowHistoriqueRealisationLine from '../../components/atelier/showHistoriqueRealisationLine'
import Nav from '../../components/header/nav'
import { isAuthorized, verifyAccessRights } from '../../services/userService'
import { Redirect } from 'react-router-dom'

export default function ShowHistoriqueRealisation(props){
    const PageRights = [2,5]
    const accessRights = verifyAccessRights(PageRights)
    const [realisations, setrealisations] = useState([])

    async function getRealisation(){
        setrealisations(await getRealisationOperationByIdRealisation(props.match.params.id_realisation))
    }

    useEffect(() => {
        getRealisation()
    }, [])
    return isAuthorized && accessRights ?(
        <>
            <Nav/>
            <div className="container">
                <h1 className="text-center mt-3">Information sur la réalisation</h1>
                <div className="row mt-3">
                    <div className="col-3" style={{fontSize: "150%"}}>
                        Operation
                    </div>
                    <div className="col-3" style={{fontSize: "150%"}}>
                        Poste de travail
                    </div>
                    <div className="col-3" style={{fontSize: "150%"}}>
                        Machine
                    </div>
                    <div className="col-3" style={{fontSize: "150%"}}>
                        Lié a la gamme
                    </div>
                </div>
                {realisations.map((linkData, index) => {return <ShowHistoriqueRealisationLine key={index} realisation={linkData}/>})}
            </div>
        </>
    ) : (
        <Redirect to="/"/>
    )
}
