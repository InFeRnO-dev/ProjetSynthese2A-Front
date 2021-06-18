import React, { useState } from 'react'
import InputLabelLogin from '../components/form/inputLabelLogin'
import { insertUser } from '../services/api/userapi'
import { formHandleChange } from '../services/formService'
import styles from '../style/login.module.css'

export default function Register(props) {
    const [credentials, setCredentials] = useState({email: '', pwd: '', confpwd:''})
    const [error, seterror] = useState(false)

    const handleChange =  (event) => {
        formHandleChange(event, credentials, setCredentials)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        seterror(false)
        if(credentials.email !== "" && credentials.pwd !== "" && credentials.confpwd !== "")
        {
            if(credentials.pwd === credentials.confpwd)
            {
                console.log (credentials)
                await insertUser(credentials.email, credentials.pwd)
                console.log('submit !')
                props.history.push('/login')
            } else {
                seterror(true)
            }
        }else {
            seterror(true)
        }
    }

    return (
        <section className={`Form ${styles.section}`}>
            <div className="container">
                <div className={`row g-0 ${styles.row}`}>
                    <div className="col-lg-5">
                        <img className={`img-fluid ${styles.img}`} src="https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-table-tennis-match-poster-background-material-image_157074.jpg" alt=""/>
                    </div>
                    <div className={`col-lg-7 ${styles.form}`}>
                        <form onSubmit={handleSubmit}>
                            <h1>Création de compte</h1>
                            {
                                error && (
                                <div className="alert alert-dismissible alert-danger">
                                    <strong>Erreur </strong>Le mot de passe ne correspond pas
                                    <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="alert"></button>
                                </div>
                                )
                            }
                            <InputLabelLogin name="email" className="form-control my-3 p-2" value={credentials.email} change={handleChange} type="Email" label="Email" placeholder="mr.dupont@ping-pong.fr" required="true"/>
                            <InputLabelLogin name="pwd" className="form-control my-3 p-2" value={credentials.pwd} change={handleChange} type="password" label="Mot de passe" placeholder="********" required="true"/>
                            <InputLabelLogin name="confpwd" className="form-control my-3 p-2" value={credentials.confpwd} change={handleChange} type="password" label="Confirmation du mot de passe" placeholder="********" required="true"/>
                            <div className="form-row">
                                <div className="col-lg-7">
                                    <button type="submit" className="btn btn-primary mt-3 w-100">Enregistrer</button>
                                </div>
                            </div>
                            <p className="mt-3">Déjà un compte ? <a href="/login">Se connecter</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}