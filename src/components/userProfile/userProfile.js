// @ts-nocheck
import { useContext, useState } from "react"
import "./userProfile.css"
import { AuthContext } from "../utils/authContext"
import UserDetails from "../userDetails/userDetails";
import { Link } from "react-router-dom";

export default function UserProfile(){

    const {renderSpiner, loadingUser} = useContext(AuthContext)

    return (
        <>
        { loadingUser?  renderSpiner() : <UserDetails/> }
        <Link to="/dashboard" className="btn btn-secondary btn-lg" role="button">Volver</Link>
        </>
    )
}