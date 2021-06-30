import React from 'react'

export default function ShowHistoriqueRealisationLine(props) {
    let gamme = props.realisation.gamme
    if(props.realisation.gamme === null){
        gamme = "Aucune"
    }
    return (
        <div className="row border-bottom">
                <div className="col-3 mt-2">
                    <p>{props.realisation.operation}</p>
                </div>
                <div className="col-3 mt-2">
                    <p>{props.realisation.poste_travail}</p>
                </div>
                <div className="col-3 mt-2">
                    <p>{props.realisation.machine}</p>
                </div>
                <div className="col-3 mt-2">
                    <p>{gamme}</p>
                </div>
        </div>
    )
}
