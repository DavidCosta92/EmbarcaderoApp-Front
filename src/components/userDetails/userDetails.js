// @ts-nocheck
import "./userDetails.css"
import { useContext } from "react";
import { AuthContext } from '../utils/authContext';

export default function UserDetails(){    
    const {loguedUser} = useContext(AuthContext)
    
    return (
      <>
        <div className="row justify-content-center">
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">Usuario logueado</h5>
                    <p className="card-text">Datos:</p>                        
                    <ul>
                        <li> Username: {loguedUser.username}</li>
                        <li> ID: {loguedUser.id}</li>
                        <li> Rol: {loguedUser.role}</li>
                        <li> Token: {loguedUser.token}</li>
                        <li> Dni: {loguedUser.dni}</li>
                        <li> Email: {loguedUser.email}</li>
                        <li> Nombre: {loguedUser.firstName}</li>
                        <li> Apellido: {loguedUser.lastName}</li>
                        <li> Telefono: {loguedUser.phone}</li>
                        {/* <li>Authorities {loguedUser.authorities}</li> */}
                    </ul>                                                
                </div>
            </div>
        </div>
      </>
    )

}