// @ts-nocheck
import * as React from 'react'
import { useContext , useEffect, useState} from "react";
import { AuthContext } from '../utils/authContext';
import {request, setAuthHeader} from "../utils/axios_helper"
import UserDetails from '../userDetails/userDetails'

import "./authContent.css"
import Dashboard from '../dashboards/dashboard'

export default function AuthContent (){    
    const {loguedUser, setLoguedUser, renderSpiner} = useContext(AuthContext)

    const [loading, setLoading ] = useState(true);

    useEffect(()=>{
        getUserDetails ()
    }, [])

    function getUserDetails(){
        request(
            "GET",
            "auth/userDetails",
            {}).then(
            (response) => {
                setLoading(false)
                setLoguedUser(response.data)
            }).catch(
            (error) => {
                console.log ("***********>>> "+error)
                if (error.response.status === 401) {
                    setAuthHeader(null);
                } else {
                    this.setState({data: error.response.code})
                }
    
            }
        );
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
           { loading?  renderSpiner() : renderContent() }
        </>  
    )
}