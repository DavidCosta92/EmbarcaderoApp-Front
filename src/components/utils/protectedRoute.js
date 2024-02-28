// @ts-nocheck
import { useNavigate, Outlet } from "react-router-dom"
import AuthForm from "../forms/authForm/authForm"
import {useContext} from "react"
import { AuthContext } from '../utils/authContext'
import { user_role } from "./userRoles"


export default function ProtectedRoute({onlyRoles , children}){

    const {loguedUser} = useContext(AuthContext)

    const navigate = useNavigate();

    const allowedByRole = !onlyRoles? true : (onlyRoles.includes(loguedUser.role) || loguedUser.role === user_role.super_admin) //loguedUser.role

    if(!loguedUser){
        return (
            <div className="container-sm  alert alert-dark mt-5 text-center">
                <h3 >Debes estar logueado para visitar esta seccion</h3>
                <button className="btn btn-primary btn-lg mt-2 mb-4 " onClick={() => navigate(-1)}>Volver atras</button>

                <div className="alert alert-secondary  text-center">
                    <h4 className="mt-5">O inicia sesion</h4>
                    <AuthForm/>
                </div>
            </div>
        )
    } else if (!allowedByRole){
        return (
            <div className="container-sm alert alert-danger mt-5 text-center">
                <h3>No tienes los permisos necesarios para visitar esta seccion</h3>
                <p>Si crees que es un error, por favor contacta con el administrador</p>
                <button className="btn btn-primary btn-lg mt-2 mb-4" onClick={() => navigate(-1)}>Volver</button>
            </div>
        )
    }
    
    return children ? children : <Outlet/>
}