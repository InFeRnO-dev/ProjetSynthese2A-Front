import React from 'react'
import { isAuthorized, verifyAccessRights } from '../services/userService'
import { Redirect } from "react-router-dom";
import Nav from '../components/header/nav';

export default function Home(){
    const PageRights = [1,2,3,4]
    const accessRights = verifyAccessRights(PageRights)

    return isAuthorized() && accessRights ?(
    <>
        <Nav/>
        <div className="container">
          <h1 className="text-center mt-3">Bienvenue</h1>
          <img className="mt-5" style={{width: "100%", height:"100%", borderRadius: "3%"}} src="https://ttredon.sportsregions.fr/media/uploaded/sites/2589/evenement/5c9762468d858_0022.gif"/>
        </div>
    </>
    ) : (
      <>
        <Redirect to='/login'/>
      </>
    )
}
