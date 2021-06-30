import React from 'react'
import { Link } from 'react-router-dom'

export default function HistoriqueRealisationLine(props) {
    const date = new Date(props.realisation.date)
    return (
        <div className="row border-bottom">
                <div className="col-4 mt-2">
                    <p>{date.toLocaleDateString()}</p>
                </div>
                <div className="col-4 mt-2">
                    <p>{props.realisation.gamme}</p>
                </div>
                <div className="col-4 mt-2">
                    <Link to={{pathname: "/atelier/realisation/historique/" + props.realisation.id_realisation, state: props}}><button type="button" className="btn btn-secondary">Voir Plus</button></Link>
                </div>
        </div>
    )
}