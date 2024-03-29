// @ts-nocheck
import { useContext, useState, useEffect } from "react";
import "./personForm.css"
import { AuthContext } from "../../utils/authContext";
import { useForm, useFormState } from 'react-hook-form';
import { request } from "../../utils/axios_helper";
import { RecordFormContext } from "../../../providers/recordFormProvider";
import { useLocation } from "react-router-dom";

export default function PersonFormRegister({personSelected , setPersonHasUpdates, renderAlert, handleClose}){

    const path = useLocation();
    const { register, formState:{isValid, errors, isDirty}, handleSubmit, watch , control, reset} = useForm()
    const { dirtyFields } = useFormState({ control });
    const { renderSpiner, renderPendingPostRequest} = useContext(AuthContext)
    const {record , setRecord } =  useContext(RecordFormContext)
    const [ personToShowFromDb, setPersonToShowFromDb] = useState() // al ingresar dni, carga datos de back si es que existe persona


    const [ loadingPersonForm, setloadingPersonForm ] = useState(false)
    const [ sendingPostRequest , setSendingPostRequest] = useState(false)
    const [ showPersonForm, setShowPersonForm ] = useState(false) // MUESTRA FORMULARIO COMPLETO

    const [ creatingNewPerson, setCreatingNewPerson] = useState(false) // para renderizado condicional de boton guardar
    
    
    
    const sendForm = (data, event) =>{   
        const formHasChanges = Object.keys(dirtyFields).length >0         
        
        // PARA FORMULARIO DE NUEVOS REGISTROS  
        if (isValid && path.pathname.includes("/addNewRecord")) {// si el modal se despliega para crear un nuevo registro           
            if(formHasChanges){ // si se crea nuevo formulario, o si se modifico la persona que existia debo pegarle al backedn!   
                if(personSelected?.id== "" || personToShowFromDb?.id ==""){   
                    console.log("createNewPerson")          
                    createNewPerson(data)
                } else{                       
                    console.log("updatePerson")          
                    updatePerson(data)
                }
            } else if (personSelected?.id  != ""){  
                console.log("setear person ya existente, sin cambiar ningun campo")    
                let recordUpd = {...record}
                recordUpd.person = data
                recordUpd.person.isUpdate = false
                setRecord(recordUpd)
                renderAlert("Persona elegida", "Exito", "success",4000)   
                handleClose()
            }            
        } 
        // PARA FORMULARIO DE EDICION DE REGISTROS
        else if(isValid && path.pathname.includes("recordDetails")){
            if(formHasChanges){
                if(personSelected.id == ""){   
                    console.log("createNewPerson")          
                    createNewPerson(data)
                } else {                       
                    console.log("updatePerson")          
                    updatePerson(data)
                }
            } else {
                console.log("setear person ya existente, sin cambiar ningun campo")    
                let recordUpd = {...record}           
                recordUpd.person = data                
                recordUpd.person.isUpdate = false
                recordUpd.person.withOutChange = Object.keys(dirtyFields).length == 0  
                setRecord(recordUpd)
                renderAlert("Persona elegida", "Exito", "success",4000)   
                handleClose()
            }

        }
    }
    const createNewPerson=(data)=>{
        setSendingPostRequest(true)
        request(
            "POST",
            `person/`,
            data )
            .then((response) => {                  
                setSendingPostRequest(false)
                if(response.status == 201){                
                    let recordUpd = {...record}            
                    recordUpd.person = data 
                    recordUpd.person.isUpdate = false
                    setRecord(recordUpd)
                    renderAlert("Persona elegida", "Exito", "success",4000)   
                    handleClose()
                }
            })
            .catch((error) => {   
                setShowPersonForm(true)
                renderAlert(error.response?.data?.message, "Error", "warning",5000)
                setSendingPostRequest(false)
            }
        )    
    }
    const updatePerson=(data)=>{
        request(
            "PUT",
            `person/`,
            data )
            .then((response) => {                  
                setSendingPostRequest(false)
                if(response.status == 202){              
                    let recordUpd = {...record}            
                    recordUpd.person = data // esto es porque si create da error al llamar al back, no deberian seguir ejecutando el codigo y en ese caso, person queda en null
                    recordUpd.person.isUpdate = true
                    setRecord(recordUpd)
                    renderAlert("Persona actualizada", "Exito", "success",4000)   
                    handleClose()
                }   
            })
            .catch((error) => {
                setShowPersonForm(true)
                renderAlert(error.response?.data?.message, "Error", "warning",5000)
                setSendingPostRequest(false)
            }
        ) 
    }

    // PRIMERA RECARGA, si viene personSelected, uso los datos para iniciar form.. si no vienen, me quedo a la espera que ponga dni para buscar en backend..
    useEffect(() => {
        let person = null
        if(personSelected?.dni){
            person = personSelected
        } else if(record?.person?.dni) {            
            person = record?.person
        }
        if(person){
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
                    setCreatingNewPerson(true)
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
                                    {(isDirty && !creatingNewPerson)? <button type="submit"  className="btn btn-warning btn-block mb-4">Actualizar</button> : <button type="submit"  className="btn btn-primary btn-block mb-4">Guardar</button>}                                    
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