import React from 'react'
import { isAuthorized, verifyAccessRights } from '../services/userService'
import { Redirect } from "react-router-dom";

export default function Home(){
    const PageRights = [1,2,3,4]
    const accessRights = verifyAccessRights(PageRights)

    return isAuthorized() && accessRights ?(
    <>
      <main className="container">
        <h1>HOME PAGE</h1>
      </main>
    </>
    ) : (
      <>
        <Redirect to='/login'/>
      </>
    )
}
