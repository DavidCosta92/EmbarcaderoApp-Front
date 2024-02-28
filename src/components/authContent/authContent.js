// @ts-nocheck
import * as React from 'react'
import { useContext , useEffect, useState} from "react";
import { AuthContext } from '../utils/authContext';
import UserDetails from '../userDetails/userDetails'

import "./authContent.css"
import Dashboard from '../dashboards/dashboard'

export default function AuthContent (){    
    const {loguedUser, setLoguedUser, renderSpiner, setAuthHeader , setUserFromSessionStorage, loadingUser} = useContext(AuthContext)

    const [loading, setLoading ] = useState(true);

    useEffect(()=>{
        getUserDetails ()
    }, [])

    function getUserDetails(){
        setUserFromSessionStorage()
    }

    function renderContent(){
        return (
            <div>
                <UserDetails/>
                <Dashboard role={loguedUser.role}/>
             </div>
        )
    }

    return (
        <>
           { loadingUser?  renderSpiner() : renderContent() }
        </>  
    )
}