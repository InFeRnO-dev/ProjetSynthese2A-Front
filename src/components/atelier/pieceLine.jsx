import React from 'react'
import { Link } from 'react-router-dom'

export default function PieceLine(props) {
    return (
        <>
            <div className="row border-bottom">
                <div className="col-3 mt-2">
                    <p>{props.piece.reference}</p>
                </div>
                <div className="col-3 mt-2">
                    <p>{props.piece.type}</p>
                </div>
                <div className="col-4 mt-2">
                    <p>{props.piece.label}</p>
                </div>
                <div className="col-2 mt-2">
                <Link to={{pathname: `/atelier/piece/${props.piece.id_piece}`, state: {piece: props.piece}}}><button className="btn btn-secondary">Voir Plus</button></Link>
                </div>
            </div>
        </>
    )
}
