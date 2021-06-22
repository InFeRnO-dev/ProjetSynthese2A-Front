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
          <h1>HOMEPAGE</h1>
        </div>
    </>
    ) : (
      <>
        <Redirect to='/login'/>
      </>
    )
}
