// @ts-nocheck

import { useContext, useEffect, useState } from "react"
import CustomAlert from "../../alert/customAlert"
import { AuthContext } from "../../utils/authContext"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { request } from "../../utils/axios_helper"
import BoatModal from "../../modals/boat/boatModal"
import PersonFormModal from "../../modals/persons/personFormModal"
import { RecordFormContext, useRecordFormContext } from "../../../providers/recordFormProvider"



export default function AddNewRecord(){
    const {renderPendingPostRequest, getShiftUser, shift} = useContext(AuthContext)
    
    const {record , setRecord } =  useContext(RecordFormContext)


    const {register, formState:{errors}, handleSubmit, watch, reset } = useForm()   
    const [ showAlert, setShowAlert] = useState(false)
    const [ alert, setAlert] = useState()
    const [ pendingPostRequest , setPendingPostRequest ] = useState (false)


    function renderAlert(msg, title, style, miliseg){
        setShowAlert(true)
        setAlert({msg:msg, title: title, style: style})
        setTimeout(() => {
            setShowAlert(false);
        }, miliseg);
      }

    useEffect(() => { // si cambia el estado globalmente actualizo!
        if(record){
            console.log("useEffect__ updateDataFormAndResetForm___ " + record?.person?.name)
            updateDataFormAndResetForm(record)
        }
    }, [record]);

    function updateDataFormAndResetForm(record){
        console.log("ESTAN LLAMANDO A updateDataFormAndResetForm____ ")
        if(record){
            console.log("me esta llegando para resetear_____ " + record?.person?.dni)
            
    
            const format = { year: '2-digit', month:'2-digit', day:'2-digit', hour: '2-digit', minute: '2-digit' }
            const start = new Date(record.startTime)
            const end = new Date(record.endTime)
            const simpleBoat = record.simpleBoat
            const person = record?.person
            const license = record?.license
            const registeredBoat = license?.registeredBoat
            const engine = registeredBoat?.engine


            reset({
                "idShift" : shift?.id ,
                "boat" :  "algo", //record?.boat && ( boat?.boatNotes && `Supuest nombre de ${boat.boatNotes}`),    
                "person": {
                    "id": record?.person?.id,
                    "dni": record?.person?.dni,
                    "phone": record?.person?.phone,
                    "name": record?.person?.name,
                    "lastName": record?.person?.lastName,
                    "emergency_phone": record?.person?.emergency_phone,
                    "address": record?.person?.address,
                    "notes": record?.person?.notes,
                    "isUpdate" : record?.person?.isUpdate
                },
                "numberOfGuests" : "",
                "car" : "",
                "notes" : "",
                "hasLicense" : "",
                "license" :  "otra cosa", // record?.boat && (boat?.license ? "Tiene licencia.." : " No tiene licencia.."),  
                "fullName": person?.name && `Supuest fullname de ${person.name}` ,// dato extra                                              
                "boatType" :"y otro mas" //boat?.typeBoat_enum // dato extra,             
            })

/*
            reset({
                "id": 1,
                "idShift" : shift?.id,
                "startTime": start.toLocaleString([], format),
                "endTime": record.endTime? end.toLocaleString([], format) : "-- --",
                "recordState": record.recordState,
                "license" : license == null ? null : {
                    "id": license.id ,
                    "licenseCode": license.licenseCode.toUpperCase(),
                    "registeredBoat": {
                        "id": registeredBoat.id,
                        "engine": {
                            "id": engine.id,
                            "engineType_enum": engine.engineType_enum ,
                            "engineNumber": engine.engineNumber ,
                            "cc": engine.cc ,
                            "notes": engine.notes 
                        },
                        "hull": registeredBoat.hull ,
                        "name": registeredBoat.name ,
                        "capacity": registeredBoat.capacity ,
                        "details": registeredBoat.details ,
                        "typeLicencedBoat_enum": registeredBoat.typeLicencedBoat_enum 
                    },
                    "owner": {
                        "id": license?.owner.id ,
                        "dni": license?.owner.dni ,
                        "name": license?.owner.name ,
                        "lastName": license?.owner.lastName ,
                        "phone": license?.owner.phone ,
                        "emergency_phone": license?.owner.emergency_phone ,
                        "address": license?.owner.address ,
                        "notes": license?.owner.notes ,
                        "fullName" : `${license?.owner.name} ${license?.owner.lastName}`
                    },
                    "licenseState_enum": license.licenseState_enum,
                    "notes": license.notes
                },
                "simpleBoat" : simpleBoat == null ? null : {
                    "id": simpleBoat.id,
                    "typeSimpleBoat_enum": simpleBoat.typeSimpleBoat_enum,
                    "details": simpleBoat.details,
                    "notes": simpleBoat.notes
                },
                "person": {
                    "id": 11111111,
                    "dni": record?.person?.dni,
                    "phone": record?.person?.phone,
                    "name": record?.person?.name,
                    "lastName": record?.person?.lastName,
                    "emergency_phone": record?.person?.emergency_phone,
                    "address": record?.person?.address,
                    "notes": record?.person?.notes,
                    "isUpdate" : record?.person?.isUpdate
                },
                "numberOfGuests": record.numberOfGuests,
                "car": record.car,//.toUpperCase(),
                "notes": record.notes
            });
 */
        }
    }

    const sendForm = (data) =>{
        // TRANSFORMO INFO ANTES DE ENVIAR A BACK
        /*
        formData.idShift = shift?.id
        formData.boat = boat?.name == undefined && "duppper" // HARDCODDEADO PARA QUE NO FALLE BACK... LUEGO MODIFICAR PARA QUE SEA REAL..
        formData.person = person?.dni
        formData.numberOfGuests = data.numberOfGuests
        formData.car = data.car.toUpperCase()
        formData.notes = data.notes
        formData.hasLicense = true // boat?.hasLicense VA TRUE PARA QUE NO FALLE BACK... LUEGO MODIFICAR PARA QUE SEA REAL..
        */

        setPendingPostRequest(true)
        request(
            "POST",
            "records/",
            /* formData*/)
            .then((response) => {      
              setPendingPostRequest(false)
              if(response.status ===201){
                renderAlert("Registro creado!", "Exito", "success",4000)              
                reset()// limpiar form..
              }
            })
            .catch(
            (error) => {
                setPendingPostRequest(false)
                if(error.response){                
                  renderAlert(`${error.response.status}: ${error.response.data.message} - Cod: ${error.response.data.internalCode}`, "Error", "warning",10000)
                } else {
                  renderAlert(`Error inesperado ${error}`, "Error", "warning",10000)
                }
            }
        )
      }

    function renderFormAddNewRecord(){
        return (
            <>
            <form onSubmit={handleSubmit(sendForm)} >  
                  <div className="boatContainer">
                    <h5>Embarcacion</h5>
                    <div className="inputContainer">
                      <div className="form-floating mb-4 inputDiv">
                        <input type="text" id="license" name="license" className="form-control" {...register("license")} disabled />
                        <label className="form-label" htmlFor="license">Matricula</label>
                      </div>
                      <div className="form-floating mb-4 inputDiv">
                        <input type="text" id="boat" name="boat" className="form-control" {...register("boat")} disabled />
                        <label className="form-label" htmlFor="boat">Nombre embarcacion</label>
                      </div>  
                      <div className="form-floating mb-4 inputDiv">
                        <input type="text" id="boatType" name="boatType" className="form-control" {...register("boatType")} disabled />
                        <label className="form-label" htmlFor="boatType">Tipo embarcacion</label>
                        {errors.boatType?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                      </div>  
                    </div>                 

                  </div>

                  {/*          
                  <div className="form-check form-switch mb-4 inputDiv">
                    <input type="checkbox" id="hasLicense" name="hasLicense" className="form-check-input" {...register("hasLicense")} />
                    <label className="form-check-label" htmlFor="hasLicense">Posee matricula</label>
                  </div>
                    */}


                  <div className="personContainer">
                    <h5>Timonel</h5>
                    <div className="inputContainer">
                      <div className="form-floating mb-4 inputDiv">
                        <input type="number" id="person.dni" name="person.dni" className="form-control"  {...register("person.dni")} disabled />
                        <label className="form-label" htmlFor="person.dni">Dni</label>
                        {errors.person?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                      </div>
                      <div className="form-floating mb-4 inputDiv">
                        <input type="text" id="fullName" name="fullName" className="form-control"  {...register("fullName")} disabled  />
                        <label className="form-label" htmlFor="fullName">Nombre y apellido</label>
                      </div>   
                    </div>
                  </div>


                  <div className="form-floating mb-4 inputDiv">
                    <input type="number" id="numberOfGuests" name="numberOfGuests" className="form-control" {...register("numberOfGuests", {required:true, min:0})}  />
                    <label className="form-label" htmlFor="numberOfGuests">Cantidad invitados</label>
                    {errors.numberOfGuests?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                  </div>
                  <div className="form-floating mb-4 inputDiv">
                    <input type="text" id="car" name="car" className="form-control" {...register("car", {required:true, maxLength:12 })}  />
                    <label className="form-label" htmlFor="car">Patente auto</label>
                    {errors.car?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                    {errors.car?.type === "maxLength" && <p className="inputFormError">Largo maximo de 12 caracteres</p>}
                  </div>
                  <div className="form-floating mb-4 inputDiv">
                    <textarea type="text" id="notes" name="notes" className="form-control" {...register("notes", {required:true, maxLength:255 })}  />
                    <label className="form-label" htmlFor="notes">Notas</label>
                    {errors.notes?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                    {errors.notes?.type === "maxLength" && <p className="inputFormError">Largo maximo de 255 caracteres</p>}
                  </div>
                 
                  <button type="submit" className="btn btn-success btn-lg btn-block mb-3" onClick={()=> console.log("hice click en btn agregar registro")}>Agregar registro</button>
            </form>
            <span className="btnModalBoat">                      
                      <BoatModal /*boat={boat} setBoat={setBoat} setFormData={setFormData} setUpdatedForm={setUpdatedForm} formData={formData}*/ renderAlert={renderAlert}/>                    
                    </span>                
            <span className="btnModalPerson">
                      {/* <PersonModal  person={person} setPerson={setPerson} setFormData={setFormData} setUpdatedForm={setUpdatedForm} formData={formData} renderAlert={renderAlert} /> */}
                      <PersonFormModal renderAlert={renderAlert}/>
            </span>
            </>
        )
    }

    return (
        <>
        {showAlert && ( <CustomAlert alertConfig={alert} /> )}
        <div className="alert alert-secondary addRecordForm">
            <h4>Agregar nuevo registro </h4> 
            {pendingPostRequest? renderPendingPostRequest() : renderFormAddNewRecord()}            
        </div>
        <Link to="/dashboard" className="btn btn-secondary btn-lg" role="button">Volver</Link>
        </>

    )
}