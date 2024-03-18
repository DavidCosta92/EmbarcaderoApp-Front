// @ts-nocheck
import { useContext, useState, useEffect } from "react";
import "./personForm.css"
import TextField from '@mui/material/TextField';
import { AuthContext } from "../../utils/authContext";
import { useForm, useFormState } from 'react-hook-form';
import { request } from "../../utils/axios_helper";
import CustomAlert from "../../alert/customAlert";

export default function PersonForm({personBd , setPersonBd , setPersonHasUpdates, renderAlert, handleClose}){

    const { renderSpiner, renderPendingPostRequest} = useContext(AuthContext)
    const [ loadingPersonForm, setloadingPersonForm ] = useState(false)
    const [ sendingPostRequest , setSendingPostRequest] = useState(false)
    const [ showPersonForm, setShowPersonForm ] = useState(false) // MUESTRA FORMULARIO COMPLETO

    
    const { register, formState:{errors, isDirty}, handleSubmit, watch , control, reset} = useForm()
    const { dirtyFields } = useFormState({ control });


    const [ personAlreadyExistBd, setPersonAlreadyExistBd] = useState(false) // si persona existia previamente en la base de datos
    const [ personToShowFromDb, setPersonToShowFromDb] = useState() // si persona existia previamente en la base de datos, la info se guarda en este estado para mostrar el formulario

    // const [ areUpdatedFiels , setAreUpdatedFiels] = useState(false)

/*
    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
          //setAreUpdatedFiels(true)
          console.log("modificando form!!!")
        });
        return () => subscription.unsubscribe(); // función de limpieza que se ejecuta cuando el componente se desmonta o antes de que el efecto se ejecute nuevamente
      }, [watch]);
*/
    const sendForm = (data) =>{ 
        setSendingPostRequest(true) 
        if(personAlreadyExistBd){// Si se encontro por dni 
            if( Object.keys(dirtyFields).length == 0){ // NO hay cambio de datos, solo seteo persona en el formulario 
                renderAlert("Persona elegida", "Exito", "success",4000)  
                setPersonBd(data)
                setPersonHasUpdates(true)                              
                handleClose()  
            } else { // Se actualizo la info que venia desde bd...
                console.log("SE ENCONTRO PERSONA, Y SE EDITARON DATOS...SE ENVIA MODIFICADO")
                request(
                    "PUT",
                    `person/`,
                    {...data} )
                    .then((response) => {        
                        if(response.status === 202){
                            renderAlert("Persona actualizada", "Exito", "success",4000)
                            setSendingPostRequest(false)  
                            setPersonBd(data)
                            setPersonHasUpdates(true)                                         
                            handleClose()  
                        }
                    })
                    .catch((error) => {                        
                        setSendingPostRequest(false)
                        renderAlert(`${error.response.status} : ${error.response.data.message}`, "Error", "error", 4000)
                    }
                ) 
            }
        } else{ // NO se encontro por dni, crear una nueva persona
            console.log("NO se encontro por dni, crear una nueva persona")
            data.isUpdate = true
            request(
                "POST",
                `person/`,
                {...data} )
                .then((response) => {        
                    if(response.status === 201){
                        renderAlert("Persona creada", "Exito", "success",4000)
                        setSendingPostRequest(false)   
                        setPersonBd(data)
                        setPersonHasUpdates(true)   
                        handleClose()  
                    }
                })
                .catch((error) => {                        
                    setSendingPostRequest(false)
                    renderAlert(`${error.response.status} : ${error.response.data.message}`, "Error", "error", 4000)
                })
        }
    }

    // PRIMERA RECARGA, si no viene persona, cargo datos llamando a back, sino los tomo de los datos enviados..
    useEffect(() => {
        if(personBd?.dni){
            reset({
                "id": personBd.id ,
                "dni": personBd.dni ,
                "phone": personBd.phone ,
                "name": personBd.name ,
                "lastName": personBd.lastName ,
                "emergency_phone": personBd.emergency_phone ,
                "address": personBd.address ,
                "notes": personBd.notes ,
            });
            setShowPersonForm(true) 
        }
      }, []);
    // Chequea el campo dni y cuando esta completo pide detalles
    const checkDniField = (event)=>{
        const dni = event.target.value        
        if(dni.length === 8){
            getPersonDetailsByDni(dni)
            setloadingPersonForm(true)
        } else {            
            setloadingPersonForm(false)
        }
    }
    // pide detalles de persona y los guarda en => personToShowFromDb
    const getPersonDetailsByDni = (dni) =>{
        request(
            "GET",
            `person/${dni}`,
            {}).then(
            (response) => {                  
                setloadingPersonForm(false)
                setPersonToShowFromDb(response.data)
                setPersonAlreadyExistBd(true)
            })
            .catch((error) => {    
                if(error.response?.status == 404){
                    setShowPersonForm(true)
                    setPersonToShowFromDb({
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
                setPersonAlreadyExistBd(false)
            }
        ) 
    }
    // cuando tengo personToShowFromDb, reseteo datos por defecto formulario, con datos de la bd, si existen y sino en blanco
    useEffect(() => {
        if (personToShowFromDb) {
            reset({
                "id": personToShowFromDb.id ,
                "dni": personToShowFromDb.dni ,
                "phone": personToShowFromDb.phone ,
                "name": personToShowFromDb.name ,
                "lastName": personToShowFromDb.lastName ,
                "emergency_phone": personToShowFromDb.emergency_phone ,
                "address": personToShowFromDb.address ,
                "notes": personToShowFromDb.notes ,
            });
            setShowPersonForm(true) 
        }        
    }, [personToShowFromDb]);

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
                            { showPersonForm && (
                                <>                                                                
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
                                                            
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="emergency_phone">Telefono emergencia</label>
                                        <input type="tel" id="emergency_phone" name="emergency_phone" className="form-control" {...register("emergency_phone")} />
                                        {errors.emergency_phone?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                                    </div>                              
                                    
                                    <div className="form-outline mb-4 inputDiv">
                                    <label className="form-label" htmlFor="address">Direccion</label>
                                        <input type="text" id="address" name="address" className="form-control" {...register("address")} />
                                        {errors.address?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                                    </div>
                                    
                                    
                                    <div className="form-outline mb-4 inputDiv">
                                    <label className="form-label" htmlFor="notes">Notas</label>
                                        <input type="text" id="notes" name="notes" className="form-control" {...register("notes")} />
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