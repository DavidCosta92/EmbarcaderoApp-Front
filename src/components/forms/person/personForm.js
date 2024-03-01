// @ts-nocheck
import { useContext, useState, useEffect } from "react";
import "./personForm.css"
import TextField from '@mui/material/TextField';
import { AuthContext } from "../../utils/authContext";
import { useForm } from 'react-hook-form';
import { request } from "../../utils/axios_helper";
import CustomAlert from "../../alert/customAlert";

export default function PersonForm({handleClose , setPersonSelected, renderAlert}){

    const {loguedUser, setLoguedUser, registerUser, loadingUser, renderSpiner, renderPendingPostRequest} = useContext(AuthContext)
    
    const { register, formState:{errors}, handleSubmit, watch , reset} = useForm()

    const [ showPersonForm, setShowPersonForm ] = useState(false)
    const [ loadingPersonForm, setloadingPersonForm ] = useState(false)

    const [ person, setPerson] = useState()

    const [ sendingPostRequest , setSendingPostRequest] = useState(false)

    const [ personFromDb , setPersonFromDb] = useState()
    const [ areUpdatedFiels , setAreUpdatedFiels] = useState(false)



    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
          setAreUpdatedFiels(true)
        });
        return () => subscription.unsubscribe(); // función de limpieza que se ejecuta cuando el componente se desmonta o antes de que el efecto se ejecute nuevamente
      }, [watch]);

    const sendForm = (data) =>{ 
        if(personFromDb && !areUpdatedFiels){// Si se encontro por dni, y NO hay cambio de datos, solo seteo persona en el formulario de registro
            renderAlert("Persona elegida", "Exito", "success",2000)        
            setPersonSelected(data)
            handleClose()  
        } else{    
            setSendingPostRequest(true)  
            savePersonSelected(data)
        }
    }
    const savePersonSelected = (data) => {  
        delete data.id
        if (!personFromDb){ // Si NO se encontro por dni, crear una nueva persona
            request(
                "POST",
                `person/`,
                {...data} )
                .then((response) => {        
                    if(response.status === 201){
                        renderAlert("Persona creada", "Exito", "success",2000)
                        setSendingPostRequest(false)
                        setPersonSelected(data)
                        handleClose()  
                    }
                })
                .catch((error) => {                        
                    setSendingPostRequest(false)
                    renderAlert(`${error.response.status} : ${error.response.data.message}`, "Error", "error", 4000)
                }
            ) 
        } else if(personFromDb && areUpdatedFiels){ // Si se encontro por dni, y hay cambio de datos, actualizar persona
            request(
                "PUT",
                `person/`,
                {...data} )
                .then((response) => {        
                    if(response.status === 202){
                        renderAlert("Persona actualizada", "Exito", "success",2000)
                        setSendingPostRequest(false)
                        setPersonSelected(data)
                        handleClose()  
                    }
                })
                .catch((error) => {                        
                    setSendingPostRequest(false)
                    renderAlert(`${error.response.status} : ${error.response.data.message}`, "Error", "error", 4000)
                }
            ) 
        }
    }

    const checkDniField = (event)=>{
        const dni = event.target.value
        if(dni.length === 8){
            getPersonDetailsByDni(dni)
            setloadingPersonForm(true)
        } else {            
            setloadingPersonForm(false)
        }
    }
    const getPersonDetailsByDni = (dni) =>{
        request(
            "GET",
            `person/${dni}`,
            {}).then(
            (response) => {                             
                setloadingPersonForm(false)
                setPerson(response.data)
                setPersonFromDb(true)
            })
            .catch((error) => {    
                if(error.response?.status == 404){
                    setShowPersonForm(true)
                    setPerson({
                        "id": "" ,
                        "phone": "" ,
                        "name":  "" ,
                        "lastName": "" ,
                        "emergency_phone": "" ,
                        "address": "" ,
                        "notes": ""
                    })
                }
                setloadingPersonForm(false)
                setPersonFromDb(false)
            }
        ) 
    }
    // cuando tengo todo, reseteo datos por defecto formulario
    useEffect(() => {
        if (person) {
            reset({
                "id": person.id ,
                "dni": person.dni ,
                "phone": person.phone ,
                "name": person.name ,
                "lastName": person.lastName ,
                "emergency_phone": person.emergency_phone ,
                "address": person.address ,
                "notes": person.notes ,
            });
            setShowPersonForm(true) 
        }        
    }, [person]);
    
                
    const renderPersonForm = ()=>{
        return(   
            <>
            <div className="row justify-content-center">
                <div className="">    
                    <div className="authForm" >
                        <form onSubmit={handleSubmit(sendForm)} className="personForm">
                            <p className="funcionalidadPendiente">CAMBIAR POR ESTILOS DE MATERIAL UI https://mui.com/material-ui/react-text-field/</p>

                            <div className="form-outline mb-4 inputDiv">
                                <label className="form-label" htmlFor="dni">Dni persona a cargo</label>
                                <input type="number" id="dni" name="dni" className="form-control" {...register("dni")} onChange={checkDniField}/>
                            </div> 
                            { loadingPersonForm && renderSpiner()}
                            { sendingPostRequest && renderPendingPostRequest()}
                            {showPersonForm && (
                                <>                                                                
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="name">Nombre</label>
                                        <input type="text" id="name" name="name" className="form-control" {...register("name", {required:true})} />
                                        {errors.name?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                                    </div>           
                                    
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="lastName">Apellido</label>
                                        <input type="text" id="lastName" name="lastName" className="form-control" {...register("lastName", {required:true})} />
                                    {errors.lastName?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                                    </div>
                    
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="phone">Telefono</label>
                                        <input type="text" id="phone" name="phone" className="form-control" {...register("phone", {required:true})} />
                                        {errors.emergency_phone?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                                    </div>      
                                                            
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="emergency_phone">Telefono emergencia</label>
                                        <input type="text" id="emergency_phone" name="emergency_phone" className="form-control" {...register("emergency_phone", {required:true})} />
                                        {errors.emergency_phone?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                                    </div>                              
                                    
                                    <div className="form-outline mb-4 inputDiv">
                                    <label className="form-label" htmlFor="address">Direccion</label>
                                        <input type="text" id="address" name="address" className="form-control" {...register("address", {required:true})} />
                                        {errors.address?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                                    </div>
                                    
                                    
                                    <div className="form-outline mb-4 inputDiv">
                                    <label className="form-label" htmlFor="notes">Notas</label>
                                        <input type="text" id="notes" name="notes" className="form-control" {...register("notes", {required:true})} />
                                        {errors.notes?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                                    </div>
                                    <button type="submit"  className="btn btn-primary btn-block mb-4">Guardar</button>
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
            {renderPersonForm()}
        
        </div>
    )
}