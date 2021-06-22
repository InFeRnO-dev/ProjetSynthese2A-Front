import React from 'react'
import { deleteQualification } from '../../services/api/atelier/qualificationapi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export default function QualificationLine(props) {

    function onClick() {
        console.log(props)
        deleteQualification(props.user.id_user, props.user.id_poste_travail)
        toast.success("L'utilisateur a bien été retiré des qualifiés")
    }

    return (
        <>
            <div className="row border-bottom">
                <div className="col-3 mt-2">
                    <p>{props.user.email}</p>
                </div>
                <div className="col-3 mt-2">
                    <button onClick={onClick} className="btn btn-danger">Retirer l'utilisateur</button>
                </div>
            </div>
        </>
    )
}
