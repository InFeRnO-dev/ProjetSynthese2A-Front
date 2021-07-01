import React, { useState } from 'react'
import InputLabel from '../form/inputLabel'
import { Multiselect } from 'multiselect-react-dropdown';
import { getAllUser } from '../../services/api/admin/userapi';
import { formHandleChange } from '../../services/formService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateGamme } from '../../services/api/atelier/gammeapi';

toast.configure()

export default function GammeLine(props) {
    const [gamme, setgamme] = useState({label: props.gamme.label})
    const [optionsuser, setoptionsuser] = useState()
    const [user, setuser] = useState()

    async function getUsers(){
        setoptionsuser(await getAllUser())
    }

    const handleChangeModifierGamme = (event) => {
        formHandleChange(event, gamme, setgamme)
    }

    const handleSubmitModifierGamme = async (event) => {
        event.preventDefault()
        if(user !== undefined){
            await updateGamme(props.index, gamme.label, user.id_user)
            toast.success("La gamme a été modifiée")
        }else{
            toast.warning("Veuillez selectionner un utilisateur")
        }
    }

    function onSelectUser(selectedList, selectedItem){
        setuser(selectedItem)
    }

    return (
        <>
        <div className="row border-bottom mt-3">
            <div className="col-3">
                <p>{props.gamme.label}</p>
            </div>
            <div className="col-3">
                <p>{props.gamme.user}</p>
            </div>
            <div className="col-3">
                <p>{props.gamme.piece}</p>
            </div>
            <div className="col-3">
                <button onClick={()=> getUsers()} className="btn btn-warning" data-bs-toggle="modal" data-bs-target={"#editGammeModal" + props.index}>Modifier</button>
            </div>
        </div>

        <div className="modal fade" id={"editGammeModal" + props.index} tabIndex="-1" aria-labelledby="editGammeModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editGammeModalLabel">Modifier une gamme</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmitModifierGamme}>
                        <div className="modal-body">                                
                            <div className="row mt-2">
                                <InputLabel name="label" className="form-control my-3 p-2" value={gamme.label} change={handleChangeModifierGamme} type="Text" label="Nom de la gamme" placeholder="Gamme" required={true} />
                            </div>
                            <div className="row mt-2">
                                <div className="col-6">
                                    Responsable de gamme :
                                </div>
                                <div className="col-6">
                                    <Multiselect
                                    options={optionsuser}
                                    singleSelect={true}
                                    placeholder="user"
                                    displayValue="email"
                                    onSelect={onSelectUser} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button id="btnEditGamme" type="submit" className="btn btn-primary">Enregistrer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
