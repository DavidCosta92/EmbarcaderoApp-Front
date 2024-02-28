// @ts-nocheck
import "./recordDetails.css"
import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {  getRecordByIdRequest , updateRecordRequest} from "../../utils/axios_helper.js";
import { AuthContext } from "../../utils/authContext.js";

export default function RecordDetails (){


    // const { register, formState:{errors}, handleSubmit, watch } = useForm({defaultValues:{ username:"para actualizar me sirve esto!"} })
    // PUEDO PASAR COMO VALORES POR DEFECTO A LOS QUE ME TRAE LA BD Y QUE EL USER SOLO MODIFIQUE PARTES
    // PUEDO PASAR COMO VALORES POR DEFECTO A LOS QUE ME TRAE LA BD Y QUE EL USER SOLO MODIFIQUE PARTES

    // PUEDO PASAR COMO VALORES POR DEFECTO A LOS QUE ME TRAE LA BD Y QUE EL USER SOLO MODIFIQUE PARTES

    // PUEDO PASAR COMO VALORES POR DEFECTO A LOS QUE ME TRAE LA BD Y QUE EL USER SOLO MODIFIQUE PARTES

    // PUEDO PASAR COMO VALORES POR DEFECTO A LOS QUE ME TRAE LA BD Y QUE EL USER SOLO MODIFIQUE PARTES

    // PUEDO PASAR COMO VALORES POR DEFECTO A LOS QUE ME TRAE LA BD Y QUE EL USER SOLO MODIFIQUE PARTES







    const {loguedUser , renderSpiner , shiftId , renderPendingPostRequest} = useContext(AuthContext)
    const {id} = useParams();

    const [ pendingPostRequest , setPendingPostRequest ] = useState (false)
    
    const [loading, setLoading ] = useState(true)   
    
    let newRecord = {
        "idShift" :shiftId,
        "boat" : {
            "id": "",
            "engine": {
                "id": "",
                "engineType_enum": "",
                "engineNumber": "",
                "cc": "",
                "notes": "s"
            },
            "hull": "duper",
            "name": "duppper",
            "capacity": 3,
            "typeBoat_enum": "LANCHA"
        },
        "person" : {
            "id": "",
            "dni": "",
            "phone": "",
            "name": "",
            "lastName": "",
            "emergency_phone": "",
            "address": "",
            "notes": ""
        },
        "numberOfGuests" : "",
        "car" : "",
        "notes" : "",
        "hasLicense" : ""
    }
    const [ record , setRecord ] = useState(newRecord)

    let recordAux = newRecord


    useEffect(()=>{
        getRecordById(id)
    }, [])
    

    function getRecordById(id){
       const record = getRecordByIdRequest(id)
       if (record !== null){
           // revisar codigo
           // revisar codigo
           // revisar codigo
           setRecord(record)
           setLoading(false) 
           recordAux = record 
           // revisar codigo
           // revisar codigo
           // revisar codigo
       }

    }
    
   const onChangeHandler = (event) => {    
    console.log("nevent.target.value ANRE "+recordAux[event.target.name])
        changeValueRecord(event)
        setRecord(recordAux)    
        console.log("nevent.target.value DESPUES "+recordAux[event.target.name])
        
   }

   const changeValueRecord=(event)=>{
        console.log("event.target.name "+event.target.name)
        console.log("nevent.target.value ANTES "+event.target.value)
        recordAux[event.target.name] = event.target.value
   }

   const onSubmitRegister = (event) =>{
    event.preventDefault()
    setPendingPostRequest(true)
    updateRecord()    
   }
   
   function updateRecord(){
        const update = updateRecordRequest(id, record)
        // terminar de desarrollar
        // terminar de desarrollar
        // terminar de desarrollar
        // terminar de desarrollar
    }
   
    
    function renderDetailsForm(){
        if(pendingPostRequest === true)  return renderPendingPostRequest ()
        return(
            <>
            <form onSubmit={onSubmitRegister}>             
            <h1 className = "funcionalidadPendiente">EDITAR REGISTRO ==== FUNCIONALIDAD PENDIENTE!</h1>
                <div className="form-floating mb-4">
                    <select id="recordState" name="recordState" className={"form-select record_"+ record.recordState} onChange={onChangeHandler} value={record.recordState}>
                        <option value="ACTIVO">Activo </option>
                        <option value="DESCONOCIDO">Desconocido </option>
                        <option value="EGRESADO">Egresado</option>
                        <option value="SINIESTRADO">Siniestrado </option>
                        <option value="ELIMINADO">Eliminado </option>
                    </select>
                    <label  htmlFor="recordState">Estado</label>
                </div>                                
 
                <div className="form-floating mb-4">
                    <input type="number" id="numberOfGuests" name="numberOfGuests" className="form-control" onChange={onChangeHandler} value={record.numberOfGuests}/>
                    <label className="form-label" htmlFor="numberOfGuests">Cantidad invitados</label>
                </div>
                <div className="form-floating mb-4">
                    <input type="text" id="car" name="car" className="form-control" onChange={onChangeHandler} value={record.car}/>
                    <label className="form-label" htmlFor="car">Patente auto</label>
                </div>
                <div className="form-floating mb-4">
                <textarea type="text" id="notes" name="notes" className="form-control" onChange={onChangeHandler} value={record.notes}/>
                    <label className="form-label" htmlFor="notes">Notas</label>
                </div>
                
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="endTime">Fecha finalizacion</label>
                    <input type="text" id="endTime" name="endTime" className="form-control" disabled value={record.endTime}/>
               </div>    

                <div className="form-check form-switch mb-4">
                    <input type="checkbox" id="hasLicense" name="hasLicense" className="form-check-input" disabled value={record.hasLicense}/>
                    <label className="form-check-label" htmlFor="hasLicense">Posee matricula</label>
                </div>  
                
            {/* PERSON  */}       
                <div>
                    <h5>Persona a cargo</h5>
                    <div className="form-floating mb-4">
                        <input type="number" id="personDni" name="personDni" className="form-control" onChange={onChangeHandler} value={record.person.dni}/>
                        <label className="form-label" htmlFor="personDni">Dni</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="text" id="personName" name="personName" className="form-control" onChange={onChangeHandler} value={record.person.name}/>
                        <label className="form-label" htmlFor="personName">Nombre</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="text" id="personLastName" name="personLastName" className="form-control" onChange={onChangeHandler} value={record.person.lastName}/>
                        <label className="form-label" htmlFor="personLastName">Apellido</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="number" id="personPhone" name="personPhone" className="form-control" onChange={onChangeHandler} value={record.person.phone}/>
                        <label className="form-label" htmlFor="personPhone">Telefono</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="number" id="personEmergencyPhone" name="personEmergencyPhone" className="form-control" onChange={onChangeHandler} value={record.person.emergency_phone}/>
                        <label className="form-label" htmlFor="personEmergencyPhone">Telefono</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="text" id="personAddress" name="personAddress" className="form-control" onChange={onChangeHandler} value={record.person.address}/>
                        <label className="form-label" htmlFor="personAddress">Direccion</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="text" id="personNotes" name="personNotes" className="form-control" onChange={onChangeHandler} value={record.person.notes}/>
                        <label className="form-label" htmlFor="personNotes">Notas</label>
                    </div>
                </div>
            {/* PERSON  */}  

            {/* BOAT  */}   
                <div>        
                    <h5>Embarcacion (solo lectura)</h5>                                                              
                    <div className="form-outline mb-4">
                        <label className="form-label funcionalidadPendiente" htmlFor="licesce">MATRICULA (pendiente)</label>
                        <input type="text" id="licesce" name="licesce" className="form-control" disabled value={record.boat.licesce}/>
                    </div>                                                                               
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="hull">Casco</label>
                        <input type="text" id="hull" name="hull" className="form-control" disabled value={record.boat.hull}/>
                    </div>                                                               
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="boatName">Nombre fantasia</label>
                        <input type="text" id="boatName" name="boatName" className="form-control" disabled value={record.boat.name}/>
                    </div>                                                               
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="capacity">Capacidad maxima</label>
                        <input type="text" id="capacity" name="capacity" className="form-control" disabled value={record.boat.capacity}/>
                    </div>                                                               
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="typeBoat_enum">Tipo embarcacion</label>
                        <input type="text" id="typeBoat_enum" name="typeBoat_enum" className="form-control" disabled value={record.boat.typeBoat_enum}/>
                    </div>
                                               
                    {/* ENGINE  */}
                    <span>             
                        <h5>Motor </h5>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="engineType_enum">Tipo motor</label>
                            <input type="text" id="engineType_enum" name="engineType_enum" className="form-control" disabled value={record.boat.engine.engineType_enum}/>
                        </div>                                             
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="engineNumber">Numero</label>
                            <input type="text" id="engineNumber" name="engineNumber" className="form-control" disabled value={record.boat.engine.engineNumber}/>
                        </div>                                             
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="cc">Cilindrada</label>
                            <input type="text" id="cc" name="cc" className="form-control" disabled value={record.boat.engine.cc}/>
                        </div>                                             
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="engineNotes">Notas</label>
                            <input type="text" id="engineNotes" name="engineNotes" className="form-control" disabled value={record.boat.engine.notes}/>
                        </div>
                    </span>
                    {/* ENGINE  */} 
                </div>
            {/* BOAT  */}      
                 
                  <button type="submit" className="btn btn-outline-danger btn-lg btn-block mb-3 funcionalidadPendiente">Editar registro</button>
            </form>
            <Link to="/dashboard" className="btn btn-secondary btn-lg" role="button">Volver</Link>
            </>
        )
    }
    

    return (
        <div className="alert alert-secondary addRecordForm">
            <h4>Detalles del registro </h4> 
            {loading? renderSpiner() : renderDetailsForm()}         
        </div>

    )
}