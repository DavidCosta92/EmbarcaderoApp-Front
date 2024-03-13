// @ts-nocheck
import "./userDetails.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../utils/authContext';
import { useForm, useFormState } from "react-hook-form";

export default function UserDetails(){    
    const {loguedUser, renderPendingPostRequest} = useContext(AuthContext)
    const [ sendingPostRequest , setSendingPostRequest] = useState(false)
    const { register, formState:{isValid, errors, isDirty}, handleSubmit, watch , control, reset} = useForm()

    const sendForm =()=>{   
        console.log("ENVIANDO FORMULARIO! => FALTA CREAR FUNCIONALIDAD EN BACKEND")     
        if (isValid) {
            // PEGAR A API PARA MODIFICAR => FALTA CREAR API
            /*
            setSendingPostRequest(true)
            request(
                "POST",
                "records/",
                formData)
                .then((response) => {      
                  setSendingPostRequest(false)
                  if(response.status ===201){
                    renderAlert("Registro creado!", "Exito", "success",4000)                
                    navigate("/dashboard")    
                  }
                })
                .catch(
                (error) => {
                    setSendingPostRequest(false)
                    if(error.response){                
                      renderAlert(`${error.response.status}: ${error.response.data.message} - Cod: ${error.response.data.internalCode}`, "Error", "warning",10000)
                    } else {
                      renderAlert(`Error inesperado ${error}`, "Error", "warning",10000)
                    }
                }
            )
*/
        }
    }

    useEffect(() => {
        if(loguedUser?.dni){
            reset({
                "username": loguedUser.username ,
                "email": loguedUser.email ,
                "dni": loguedUser.dni ,
                "phone": loguedUser.phone ,
                "name": loguedUser.firstName ,
                "lastName": loguedUser.lastName ,
                "emergency_phone": loguedUser.emergency_phone? loguedUser.emergency_phone : "MODIFICAR BACK PARA TENER NUM EMERG"  ,
                "role": loguedUser.role 
            });
        }
      }, []);

    const renderUseForm = ()=>{
        return(   
            <>
            <div className="row justify-content-center">
                <div className="">    
                    <div className="authForm" >
                        <form onSubmit={handleSubmit(sendForm)} className="personForm">
                            { sendingPostRequest && renderPendingPostRequest()}
                                <>                                                                
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="username">Username</label>
                                        <input type="text" id="username" name="username" className="form-control" {...register("username")} disabled />
                                    </div>                                                     
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <input type="mail" id="email" name="email" className="form-control" {...register("email")} disabled />
                                    </div>                                                       
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="dni">Dni</label>
                                        <input type="text" id="dni" name="dni" className="form-control" {...register("dni")} disabled />
                                    </div>                                                        
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="role">Rol</label>
                                        <input type="text" id="role" name="role" className="form-control" {...register("role")} disabled />
                                    </div>             
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="name">Nombre</label>
                                        <input type="text" id="name" name="name" className="form-control" {...register("name")} />
                                        {errors.name?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                                    </div>           
                                    
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="lastName">Apellido</label>
                                        <input type="text" id="lastName" name="lastName" className="form-control" {...register("lastName")} />
                                    {errors.lastName?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                                    </div>
                    
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="phone">Telefono</label>
                                        <input type="tel" id="phone" name="phone" className="form-control" {...register("phone")} />
                                        {errors.emergency_phone?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                                    </div>      
                                                            
                                    <div className="form-outline mb-4 inputDiv funcionalidadPendiente">
                                        <label className="form-label" htmlFor="emergency_phone">Telefono emergencia</label>
                                        <input type="tel" id="emergency_phone" name="emergency_phone" className="form-control" {...register("emergency_phone")} />
                                        {errors.emergency_phone?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                                    </div>                              
                                    {isDirty && <button type="submit"  className="btn btn-primary btn-block mb-4">Actualizar</button>}                                    
                                </>                                
                            
                        </form>
                    </div>                
                </div>
            </div>
            </>         
        )
    }
    
    return (
      <>
        <div className="funcionalidad pendiente m-4">        
                    <h4 className="funcionalidadPendiente" >DAR FUNCIONALIDAD DE MODIFICAR user en BACKEND</h4>
                    <h4 className="funcionalidadPendiente">DEBO TENER UN BOTON PARA ELEGIR UNA FOTO DE PERFIL Y PODER CAMBIARLA</h4>
        </div>
      {renderUseForm()}
      </>
    )

}