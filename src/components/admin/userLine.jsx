import React, { useEffect, useState } from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import { deleteUserDroits, getAllDroits, getAllUserDroitsByIdUser, insertUserDroits } from '../../services/api/droitapi';
import { formHandleChange } from '../../services/formService';
import InputLabelLogin from '../form/inputLabelLogin'
import { deleteUser, updateUser } from '../../services/api/userapi';

export default function UserLine(props) {
    console.log(props.user)
    console.log(props.index)
    const [error, seterror] = useState(false)
    const [credentials, setCredentials] = useState({email: props.user.email, pwd: "", confpwd: ""})
    const [options, setoptions] = useState([])
    const [droits, setdroits] = useState([])

    async function getOptions(){
        setoptions(await getAllDroits())
    }

    async function getDatas() {
        const droit = await getAllUserDroitsByIdUser(props.user.id_user)
        setdroits(droit)
        console.log(droit)
    }
    
    const handleChange =  (event) => {
        formHandleChange(event, credentials, setCredentials)
    }

    const handleSubmitEdit = async (event) => {
        event.preventDefault()
        seterror(false)
        if(credentials.email !== "")
        {
            if(credentials.pwd === credentials.confpwd)
            {
                console.log (props.user.id_user, credentials)
                updateUser(props.user.id_user, credentials.email, credentials.pwd)
                console.log('submit !')
            } else {
                seterror(true)
            }
        }else {
            seterror(true)
        }
    }
    const handleSubmitDelete = async (event) => {
        event.preventDefault()
        deleteUser(props.user.id_user)
    }

    function onSelect(selectedList, selectedItem) {
        console.log(selectedList, selectedItem)
        insertUserDroits(selectedItem.id_droits,props.user.id_user)
    }
    
    function onRemove(selectedList, removedItem) {
        console.log(selectedList, removedItem)
        deleteUserDroits(removedItem.id_droits, props.user.id_user)
    }

    useEffect(() => {
        getOptions()
        getDatas()
    }, [])
    return (

        <>
        <div className="row border-bottom">
            <div className="col-3 mt-2">
                <p>{props.user.email}</p>
            </div>
            <div className="col-4 mt-2">
                <p style={{fontSize: '55%'}}>{props.user.password}</p>
            </div>
            <div className="col-3 mt-2">
                <Multiselect
                id={props.index}
                showCheckbox={true}
                placeholder="Droits"
                options={options}
                selectedValues={droits}
                displayValue="label"
                onSelect={onSelect}
                onRemove={onRemove}/>

            </div>
            <div className="col-2 mt-2">
                <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target={"#editUserModal" + props.index}>Edit</button>
                <button className="btn btn-danger"data-bs-toggle="modal" data-bs-target={"#deleteUserModal" + props.index}>Delete</button>
            </div>
        </div>

        <div className="modal fade" id={"editUserModal" + props.index} tabIndex="-1" aria-labelledby={"editUserModalLabel" + props.index} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={"editUserModalLabel" + props.index}>Modifier un utilisateur</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmitEdit}>
                        <div className="modal-body">
                            {
                                error && (
                                <div className="alert alert-dismissible alert-danger">
                                    <strong>Erreur </strong>Le mot de passe ne correspond pas
                                    <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="alert"></button>
                                </div>
                                )
                            }
                            <InputLabelLogin name="email" className="form-control my-3 p-2" value={credentials.email} change={handleChange} type="Email" label="Email" placeholder="mr.dupont@ping-pong.fr" required="true"/>
                            <InputLabelLogin name="pwd" className="form-control my-3 p-2" value={credentials.pwd} change={handleChange} type="password" label="Mot de passe" placeholder="********" />
                            <InputLabelLogin name="confpwd" className="form-control my-3 p-2" value={credentials.confpwd} change={handleChange} type="password" label="Confirmation du mot de passe" placeholder="********" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="submit" className="btn btn-primary">Enregistrer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div className="modal fade" id={"deleteUserModal" + props.index} tabIndex="-1" aria-labelledby={"deleteUserModalLabel" + props.index} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={"deleteUserModalLabel" + props.index}>Supprimer un utilisateur</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmitDelete}>
                        <div className="modal-body">
                            Voulez vous vraiment supprimer l'utilisateur {props.user.email}
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
