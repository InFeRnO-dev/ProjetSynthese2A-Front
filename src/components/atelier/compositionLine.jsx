import React from 'react'
import { deleteComposition } from '../../services/api/atelier/compositionapi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export default function CompositionLine(props) {
    console.log(props)

    const handleSubmitDelete = async(event) => {
        event.preventDefault()
        if((await deleteComposition(props.composition.id_composition)).status === 200){
            toast.success("Piece supprimée de la composition")
        }else{
            toast.success("Une erreur c'est produite")
        }
    }

    return (
        <>
            <div className="row border-bottom">
                <div className="col-3 mt-2">
                    <p>{props.composition.reference}</p>
                </div>
                <div className="col-3 mt-2">
                    <p>{props.composition.label}</p>
                </div>
                <div className="col-3 mt-2">
                    {props.composition.quantite}
                </div>
                <div className="col-3 mt-2">
                    <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteCompositionModal" + props.composition.id_composition}>Supprimer</button>
                </div>
            </div>

            <div className="modal fade" id={"deleteCompositionModal" + props.composition.id_composition} tabIndex="-1" aria-labelledby="deleteCompositionModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteUserModalLabel">Supprimer une piece</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmitDelete}>
                            <div className="modal-body">
                                Voulez vous vraiment supprimer la piece {props.composition.reference} de la composition
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button type="submit" className="btn btn-danger">Supprimer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
