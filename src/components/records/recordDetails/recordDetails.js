// @ts-nocheck
import "./recordDetails.css"
import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {  request } from "../../utils/axios_helper.js";
import { AuthContext } from "../../utils/authContext.js";
import { useForm } from 'react-hook-form';
import CustomAlert from "../../alert/customAlert.js";


export default function RecordDetails (){
    const {loguedUser , renderSpiner,shift , renderPendingPostRequest, getShiftUser} = useContext(AuthContext)
    const {id} = useParams();
    const {register, formState:{errors}, handleSubmit, watch , reset} = useForm()

    const [ pendingPostRequest , setPendingPostRequest ] = useState (false)   
    const [ loading, setLoading ] = useState(true)   
    const [ record , setRecord ] = useState()

    
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState()

    // Al renderizar obtengo record
    useEffect(()=>{
        const fetchData = async () => {
            const data =  getRecordById();    
            setRecord(data);
            setLoading(false);
        };
        fetchData();       
    }, [])
    // cuando tengo record, pido shift
    useEffect(()=>{
        getShiftUser()
    }, [record])
    // cuando tengo todo, reseteo datos por defecto formulario
    useEffect(() => {
        if (record) {
            const format = { year: '2-digit', month:'2-digit', day:'2-digit', hour: '2-digit', minute: '2-digit' }
            const start = new Date(record.startTime)
            const end = new Date(record.endTime)

            const boat = record.boat
            const engine = boat.engine
            const person = record.person
            reset({
                "id": id,
                "idShift" : shift?.id,
                "startTime": start.toLocaleString([], format),
                "endTime": record.endTime? end.toLocaleString([], format) : "-- --",
                "recordState": record.recordState,
                "boat": { 
                    "id": boat.id,
                    "engine": {
                        "id":engine.id,
                        "engineType_enum": engine.engineType_enum,
                        "engineNumber": engine.engineNumber,
                        "cc": engine.cc,
                        "notes": engine.notes
                        },
                    "hull": boat.hull,
                    "name": boat.name,
                    "capacity": boat.capacity,
                    "typeBoat_enum": boat.typeBoat_enum
                    },
                "person": {
                    "id": person.id,
                    "dni": person.dni,
                    "phone": person.phone,
                    "name": person.name,
                    "lastName": person.lastName,
                    "emergency_phone": person.emergency_phone,
                    "address": person.address,
                    "notes": person.notes,
                    "isUpdate" : person.isUpdate
                    },
                "numberOfGuests": record.numberOfGuests,
                "car": record.car.toUpperCase(),
                "notes": record.notes
            });
        }
    }, [shift]);

    function getRecordById(){       
        request(
            "GET",
            `records/${id}`,
            {}).then(
            (response) => {             
                setRecord(response.data)
                setLoading(false) 
            })
            .catch(
            (error) => {    
                setRecord(null)
            }
        )     
    }   
    function changeStyleRecordState(event){
        let recordStateInput = document.getElementById("recordState")
        recordStateInput.className =""
        recordStateInput.classList.add("form-select", `record_${event.target.value}`)
    }
    function renderAlert(msg, title, style, miliseg){
        setShowAlert(true)
        setAlert({msg:msg, title: title, style: style})
        setTimeout(() => {
            setShowAlert(false);
         }, miliseg);
    }
    const updateRecord = (data) =>{
        setPendingPostRequest(true)
        request(
            "PUT",
            `records/${id}`,
            data
            ).then((response) => {      
                setRecord(response.data)
                setPendingPostRequest(false) 
                renderAlert("Registro actualizado!", "Exito", "success",4000)

            }).catch(
            (error) => {
                console.log("error >>>> "+ error)
                setPendingPostRequest(false)                 
                renderAlert(error, "Error", "warning",5000)
            }
        )
    }
    function renderDetailsForm(){
        if(pendingPostRequest === true)  return renderPendingPostRequest ()
        return(
            <>
            <form onSubmit={handleSubmit(updateRecord)} className="formRecordDetails">             
                <input type="text" hidden id="idShift" name="idShift" {...register("idShift")} />
                <div className="smallInputContainer">                    
                    <div className="form-floating mb-4 ">
                        <select id="recordState" name="recordState" className={`form-select record_${record?.recordState}`} {...register("recordState")} onChange={changeStyleRecordState} >
                            <option value="ACTIVO">Activo </option>
                            <option value="DESCONOCIDO">Desconocido </option>
                            <option value="EGRESADO">Egresado</option>
                            <option value="SINIESTRADO">Siniestrado </option>
                            <option value="ELIMINADO">Eliminado </option>
                        </select>
                        <label  htmlFor="recordState">Estado</label>
                    </div>               
                    <div className="form-floating mb-4 ">
                        <input type="number" id="numberOfGuests" name="numberOfGuests" className="form-control"  {...register("numberOfGuests", {required:true})} />
                        <label className="form-label" htmlFor="numberOfGuests">Cantidad invitados</label>
                        {errors.numberOfGuests?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                    </div>
                    <div className="form-floating mb-4 ">
                        <input type="text" id="car" name="car" className="form-control" {...register("car", {required:true})} />
                        <label className="form-label" htmlFor="car">Patente auto</label>
                        {errors.car?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                    </div>
                    <div className="form-floating mb-4 ">
                        <input type="text" id="startTime" name="startTime" className="form-control" disabled {...register("startTime")} />
                        <label className="form-label" htmlFor="startTime">Inicio</label>
                    </div>   
                    <div className="form-floating mb-4 ">
                        <input type="text" id="endTime" name="endTime" className="form-control" disabled {...register("endTime")} />
                        <label className="form-label" htmlFor="endTime">Fin</label>
                    </div>   
                </div>    

                <div className="form-floating mb-4 textArea">
                    <textarea type="text" id="notes" name="notes" className="form-control" {...register("notes")} />
                    <label className="form-label" htmlFor="notes">Notas</label>
                </div>
                             
            {/* PERSON  */}       
                <div>
                    <h5>Persona a cargo</h5>
                    <div className="smallInputContainer">
                        <div className="form-floating mb-4">
                            <input type="number" id="person.dni" name="person.dni" className="form-control" {...register("person.dni", {required:true})} />
                            <label className="form-label" htmlFor="person.dni">Dni</label>
                            {errors.person?.dni?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        <div className="form-floating mb-4">
                            <input type="text" id="person.name" name="person.name" className="form-control" {...register("person.name", {required:true})} />
                            <label className="form-label" htmlFor="person.name">Nombre</label>
                            {errors.person?.name?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        <div className="form-floating mb-4">
                            <input type="text" id="person.lastName" name="person.lastName" className="form-control" {...register("person.lastName", {required:true})} />
                            <label className="form-label" htmlFor="person.lastName">Apellido</label>
                            {errors.person?.lastName?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        <div className="form-floating mb-4">
                            <input type="number" id="person.phone" name="person.phone" className="form-control" {...register("person.phone", {required:true})} />
                            <label className="form-label" htmlFor="person.phone">Telefono</label>
                            {errors.person?.phone?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        <div className="form-floating mb-4">
                            <input type="number" id="person.emergency_phone" name="person.emergency_phone" className="form-control" {...register("person.emergency_phone", {required:true})} />
                            <label className="form-label" htmlFor="person.emergency_phone">Telefono</label>
                            {errors.person?.emergency_phone?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        <div className="form-floating mb-4">
                            <input type="text" id="person.address" name="person.address" className="form-control" {...register("person.address", {required:true})} />
                            <label className="form-label" htmlFor="person.address">Direccion</label>
                            {errors.person?.address?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                    </div>
                    <div className="form-floating mb-4 textArea">
                        <textarea type="text" id="person.notes" name="person.notes" className="form-control" {...register("person.notes")} />
                        <label className="form-label" htmlFor="person.notes">Notas</label>
                    </div>
                    <div className="form-check mb-4  funcionalidadPendiente">
                        <input type="checkbox" id="person.isUpdate" name="person.isUpdate" className="form-check-input" {...register("person.isUpdate")} />
                        <h4>Aca lo que debo hacer es, como primer paso, poner el dni, y que se levante un modal que muestre todos los datos de la persona,  o vacio si no hay ninguno.. y luego de que se llene o modifique, el boton del modal debe guardar la persona y dejarla seteada</h4>
                        <label className="form-label" htmlFor="person.isUpdate">Es una actualizacion de persona?</label>
                    </div>
                </div>
            {/* PERSON  */}  

            {/* BOAT  */}   
                <div>        
                    <h5>Embarcacion (solo lectura)</h5>  
                    <div className="smallInputContainer">                                                          
                        <div className="form-outline mb-4">
                            <label className="form-label funcionalidadPendiente" htmlFor="licesce">MATRICULA (pendiente)</label>
                            <input type="text" id="boat.licesce" name="boat.licesce" className="form-control" disabled {...register("boat.licesce")} />
                        </div>                                                                               
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="boat.hull">Casco</label>
                            <input type="text" id="boat.hull" name="boat.hull" className="form-control" disabled {...register("boat.hull")} />
                        </div>                                                               
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="boat.name">Nombre fantasia</label>
                            <input type="text" id="boat.name" name="boat.name" className="form-control" disabled {...register("boat.name")} />
                        </div>                                                               
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="boat.capacity">Capacidad maxima</label>
                            <input type="text" id="boat.capacity" name="boat.capacity" className="form-control" disabled {...register("boat.capacity")} />
                        </div>                                                               
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="boat.typeBoat_enum">Tipo embarcacion</label>
                            <input type="text" id="boat.typeBoat_enum" name="boat.typeBoat_enum" className="form-control" disabled {...register("boat.typeBoat_enum")} />
                        </div>
                                               
                    {/* ENGINE  */}  
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="boat.engine.engineType_enum">Tipo motor</label>
                            <input type="text" id="boat.engine.engineType_enum" name="boat.engine.engineType_enum" className="form-control" disabled {...register("boat.engine.engineType_enum")} />
                        </div>                                             
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="boat.engine.engineNumber">Numero</label>
                            <input type="text" id="boat.engine.engineNumber" name="boat.engine.engineNumber" className="form-control" disabled {...register("boat.engine.engineNumber")} />
                        </div>                                             
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="boat.engine.cc">Cilindrada</label>
                            <input type="text" id="boat.engine.cc" name="boat.engine.cc" className="form-control" disabled {...register("boat.engine.cc")} />
                        </div>    
                    </div>                                           
                    <div className="form-outline mb-4 textArea">
                        <label className="form-label" htmlFor="boat.engine.engineNotes">Notas</label>
                        <input type="text" id="boat.engine.engineNotes" name="boat.engine.engineNotes" className="form-control" disabled {...register("boat.engine.notes")} />
                    </div>
                    {/* ENGINE  */} 
                </div>
            {/* BOAT  */}      
                 
                  <button type="submit" className="btn btn-outline-danger btn-lg funcionalidadPendiente">Editar registro</button>
            </form>
            </>
        )
    }
    

    return (
        <>
        {showAlert && ( <CustomAlert alertConfig={alert} /> )}

        <div className="alert alert-secondary addRecordForm">
            <h4>Detalles del registro </h4>   
            {loading? renderSpiner() : renderDetailsForm()}   
        </div>
        
        <Link to="/dashboard" className="btn btn-secondary goBackBtn" role="button">Volver</Link>
        </>
    )
}