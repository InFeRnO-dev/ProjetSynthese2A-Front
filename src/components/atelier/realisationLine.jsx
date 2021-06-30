import React from 'react'

export default function RealisationLine(props) {
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
                    <p>{props.realisation.operation}</p>
                </div>
        </div>
    )
}
