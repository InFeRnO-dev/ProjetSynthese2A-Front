import React from 'react'

export default function CompositionLine(props) {
    return (
        <div className="row border-bottom">
            <div className="col-4 mt-2">
                <p>{props.composition.label}</p>
            </div>
            <div className="col-4 mt-2">
                {props.composition.quantite}
            </div>
        </div>
    )
}
