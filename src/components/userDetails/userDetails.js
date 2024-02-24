// @ts-nocheck
import "./userDetails.css"

export default function UserDetails({user}){    
    return (
      <>
        <div className="row justify-content-center">
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">Usuario logueado</h5>
                    <p className="card-text">Datos:</p>                        
                    <ul>
                        <li> Username: {user.username}</li>
                        <li> ID: {user.id}</li>
                        <li> Rol: {user.role}</li>
                        <li> Token: {user.token}</li>
                        <li> Dni: {user.dni}</li>
                        <li> Email: {user.email}</li>
                        <li> Nombre: {user.firstName}</li>
                        <li> Apellido: {user.lastName}</li>
                        <li> Telefono: {user.phone}</li>
                        {/* <li>Authorities {user.authorities}</li> */}
                    </ul>                                                
                </div>
            </div>
        </div>
      </>
    )

}