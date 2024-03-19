// @ts-nocheck
import { useForm, useFormState } from "react-hook-form";
import "./addStaffForm.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/authContext";
import { AlertContext } from "../../utils/alertContex";
import { request } from "../../utils/axios_helper";
import { Badge, Chip } from "@mui/material";

export default function AddStaffForm({handleClose}){
    const { register, formState:{isValid, errors, isDirty}, handleSubmit, watch , control, reset} = useForm()
    const { dirtyFields } = useFormState({ control });
    const { renderSpiner, renderPendingPostRequest, getShiftUser, shift, setShift, setShiftHasUpdates} = useContext(AuthContext)
    const { alert, renderAlert, displayAlert } = useContext(AlertContext)  

    const [ loadingUserForm, setLoadingUserForm ] = useState(false)
    const [ userStaff, setUserStaff ] = useState(false)
    const [ showUserForm, setShowUserForm ] = useState(false)
    const [ sendingPostRequest , setSendingPostRequest] = useState(false)

    const sendForm = (data, event) =>{
        setSendingPostRequest(true)
        request(
            "POST",
            `shifts/${shift.id}/staff/`,
            {"dni":data.dni}).then(
            (response) => {                
                console.log(response)   
                renderAlert("Usuario agregado!", "Exito", "success",4000)   
                handleClose()
                setUserStaff(false)
                setShiftHasUpdates(true)
            })
            .catch((error) => {    
                if(error.response){
                    setSendingPostRequest(false)
                    setShowUserForm(true)
                    console.log(error.response)
                    renderAlert(`Error ${error.response?.status}: ${error.response?.data?.message}`, "Error", "error",5000)  
                    setLoadingUserForm(false)
                }
            }
        ) 
    }

    // Chequea el campo dni y cuando esta completo pide detalles
    const checkDniField = (event)=>{
        const dni = event.target.value        
        if(dni.length === 8){
            getUserDetailsByDni(dni)
            setLoadingUserForm(true)
        } else {            
            setLoadingUserForm(false)
        }
    }
    // pide detalles de persona y los guarda en => personToShowFromDb
    const getUserDetailsByDni = (dni) =>{
        request(
            "GET",
            `shifts/${shift.id}/staff/${dni}`,
            {}).then(
            (response) => {                  
                setLoadingUserForm(false)
                setUserStaff(response.data)
            })
            .catch((error) => {    
                if(error.response?.status == 404){
                    renderAlert(`Error ${error.response?.status}: Usuario NO ENCONTRADO`, "Error", "error",5000)  
                } else if(error.response?.status == 406){
                    renderAlert(`Error ${error.response?.status}: Usuario NO ES GUARDAVIDA`, "Error", "warning",5000)  
                }
                setUserStaff(null)
                setShowUserForm(false)
                setLoadingUserForm(false)
            }
        ) 
    }
    // cuando tengo personToShowFromDb, reseteo datos por defecto formulario, con datos de la bd..    
    useEffect(() => {
        if (userStaff) {
            reset({
                "id": userStaff.id ,
                "username" : userStaff.username,
                "dni": userStaff.dni ,
                "phone": userStaff.phone ,
                "firstName": userStaff.firstName ,
                "lastName": userStaff.lastName ,
                "role": userStaff.role ,
                "email": userStaff.email ,
                "notes": userStaff.notes ,
                "authorities" : userStaff.authorities,
                "enabled" : userStaff.enabled,
                "credentialsNonExpired" : userStaff.credentialsNonExpired,
                "accountNonExpired" : userStaff.accountNonExpired,
                "accountNonLocked" : userStaff.accountNonLocked
            });
            setShowUserForm(true) 
        }   
    }, [userStaff]);
    const renderStaffForm = ()=>{
        let validUser = (userStaff?.role =="LIFEGUARD" && userStaff?.enabled && userStaff?.credentialsNonExpired && userStaff?.accountNonExpired && userStaff?.accountNonLocked) ? true : false

        return(   
            <>
            <div className="row justify-content-center">
                <div className="">    
                    <div className="authForm" >
                        <form onSubmit={handleSubmit(sendForm)} className="personForm">
                            <p className="funcionalidadPendiente">CAMBIAR POR ESTILOS DE MATERIAL UI https://mui.com/material-ui/react-text-field/</p>

                            <div className="form-outline mb-4 inputDiv">
                                <span className="labelDni">
                                    <label className="form-label" htmlFor="dni">Dni usuario</label>
                                    {!userStaff? ("") : (validUser? <Chip className="chip" label="Usuario elegible"  color="success"/> : <Chip className="chip" label="Usuario NO valido"  color="error"/>)}
                                </span>
                                <input type="number" id="dni" name="dni" className="form-control" {...register("dni")} onChange={checkDniField}/>
                            </div> 
                            { loadingUserForm && renderSpiner()}
                            { sendingPostRequest && renderPendingPostRequest()}
                            { showUserForm && (
                                <>        
                                    {validUser &&
                                    <div className="btnFormContainer">  
                                        <button type="submit"  className="btn btn-success  mb-4">Guardar</button>
                                    </div>} 

                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="username">Username</label>
                                        <input type="text" id="username" name="username" className="form-control" {...register("username")} disabled />
                                    </div>                                                    
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="firstName">Nombre</label>
                                        <input type="text" id="firstName" name="firstName" className="form-control" {...register("firstName")} disabled />
                                    </div>           
                                    
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="lastName">Apellido</label>
                                        <input type="text" id="lastName" name="lastName" className="form-control" {...register("lastName")} disabled/>
                                    </div>
                    
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="phone">Telefono</label>
                                        <input type="tel" id="phone" name="phone" className="form-control" {...register("phone")} disabled />
                                    </div>      
                                                       
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <input type="email" id="email" name="email" className="form-control" {...register("email")} disabled />
                                    </div>                                       
                                </>                                
                            )}   
                        </form>
                    </div>                
                </div>
            </div>
            </>         
        )
    }
    return (
        <div>            
            {renderStaffForm()}
        
        </div>
    )
}