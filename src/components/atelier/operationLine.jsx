import React from 'react'

export default function OperationLine(props) {
    return (
        <div className="row border-bottom">
                <div className="col-3 mt-2">
                    <p>{props.operation.label}</p>
                </div>
                <div className="col-3 mt-2">
                    <p>{props.operation.poste_travail}</p>
                </div>
                <div className="col-3 mt-2">
                    <p>{props.operation.machine}</p>
                </div>
                <div className="col-3 mt-2">
                    <p>{props.operation.temps_travail}s</p>
                </div>
        </div>
    )
}
