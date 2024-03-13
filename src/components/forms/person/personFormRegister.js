// @ts-nocheck
import { useContext, useState, useEffect } from "react";
import "./personForm.css"
import TextField from '@mui/material/TextField';
import { AuthContext } from "../../utils/authContext";
import { useForm, useFormState } from 'react-hook-form';
import { request } from "../../utils/axios_helper";
import CustomAlert from "../../alert/customAlert";
import { RecordFormContext } from "../../../providers/recordFormProvider";

export default function PersonFormRegister({personBd , setPersonBd , setPersonHasUpdates, renderAlert, handleClose}){

    const { renderSpiner, renderPendingPostRequest} = useContext(AuthContext)
    const [ loadingPersonForm, setloadingPersonForm ] = useState(false)
    const [ sendingPostRequest , setSendingPostRequest] = useState(false)
    const [ showPersonForm, setShowPersonForm ] = useState(false) // MUESTRA FORMULARIO COMPLETO
    const [ personToShowFromDb, setPersonToShowFromDb] = useState() // si persona existia previamente en la base de datos, la info se guarda en este estado para mostrar el formulario


    
    const { register, formState:{isValid, errors, isDirty}, handleSubmit, watch , control, reset} = useForm()
    const { dirtyFields } = useFormState({ control });


    const {record , setRecord } =  useContext(RecordFormContext)


    const sendForm = (data) =>{
        if (isValid) {
            const formHasChanges = Object.keys(dirtyFields).length >0
            let recordUpd = {...record}
            recordUpd.person = data
            recordUpd.person.isUpdate = formHasChanges

            if(formHasChanges){ // si se crea nuevo formulario, o si se modifico la persona que existia debo pegarle al backedn!
                // aca deberia llamar a guardar persona, si es que viene con datos nuevos, o si es para actualizar datos!
                // aca deberia llamar a guardar persona, si es que viene con datos nuevos, o si es para actualizar datos!
                // aca deberia llamar a guardar persona, si es que viene con datos nuevos, o si es para actualizar datos!
                // aca deberia llamar a guardar persona, si es que viene con datos nuevos, o si es para actualizar datos!
                // aca deberia llamar a guardar persona, si es que viene con datos nuevos, o si es para actualizar datos!
            }
            setRecord(recordUpd)
            renderAlert("Persona elegida", "Exito", "success",4000)          
            handleClose()
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
            }
        ) 
    }
    // cuando tengo personToShowFromDb, reseteo datos por defecto formulario, con datos de la bd..    
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