import React from 'react'
import { deletePosteMachine } from '../../services/api/atelier/postemachineapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure()

export default function MachineLine(props) {

    function onClick() {
        console.log(props)
        deletePosteMachine(props.poste.id_poste_travail, props.machine.id_machine)
        toast.success("La machine a été retirée du poste de travail")
    }

    return (
        <>
            <div className="row border-bottom">
                <div className="col-3 mt-2">
                    <p>{props.machine.label}</p>
                </div>
                <div className="col-3 mt-2">
                    <button onClick={onClick} className="btn btn-danger">Retirer la machine</button>
                </div>
            </div>
        </>
    )
}