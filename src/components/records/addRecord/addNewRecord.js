// @ts-nocheck

import "./addNewRecord.css"
import { useContext, useEffect, useState } from "react"
import CustomAlert from "../../alert/customAlert"
import { AuthContext } from "../../utils/authContext"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { request } from "../../utils/axios_helper"
import { useNavigate } from 'react-router-dom';
import PersonFormModal from "../../modals/persons/personFormModal"
import { RecordFormContext, useRecordFormContext } from "../../../providers/recordFormProvider"
import BoatFormModal from "../../modals/boat/boatFormModal"



export default function AddNewRecord(){
  const navigate = useNavigate()
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
            updateDataFormAndResetForm(record)
        }
    }, [record]);

    function updateDataFormAndResetForm(record){
        console.log("ESTAN LLAMANDO A updateDataFormAndResetForm____ ")
        if(record){
            console.log("me esta llegando para resetear_____ " + record?.person?.isUpdate)            
    
            const format = { year: '2-digit', month:'2-digit', day:'2-digit', hour: '2-digit', minute: '2-digit' }
            const start = new Date(record.startTime)
            const end = new Date(record.endTime)
            const simpleBoat = record?.simpleBoat
            const person = record?.person
            const license = record?.license
            const registeredBoat = license?.registeredBoat
            const engine = registeredBoat?.engine
            const boat = record?.boat

            


            /*
           VERIFICAR QUE ESTE ENVIANDO LICENSE Code, DE MANERA CORRECTA!!
           VERIFICAR QUE ESTE ENVIANDO LICENSE Code, DE MANERA CORRECTA!!
           VERIFICAR QUE ESTE ENVIANDO LICENSE Code, DE MANERA CORRECTA!!
           VERIFICAR QUE ESTE ENVIANDO LICENSE Code, DE MANERA CORRECTA!!
           VERIFICAR QUE ESTE ENVIANDO LICENSE Code, DE MANERA CORRECTA!!
           VERIFICAR QUE ESTE ENVIANDO LICENSE Code, DE MANERA CORRECTA!!
            {
                "idShift" :1 ,
                "license" : {
                            "licenseCode" : "msj01"
                } 
              }
            */

            reset({
                "idShift" : shift?.id ,
                "license" : record?.license && {
                     "licenseCode" : `${record?.license.licenseCode.toUpperCase()}`
                    },
                "simpleBoat" : record?.simpleBoat && {
                    "typeSimpleBoat_enum" : simpleBoat?.typeSimpleBoat_enum,
                    "details" : simpleBoat?.details,
                    "notes" : simpleBoat?.notes
                },
                "person": {
                    "dni": record?.person?.dni
                },
                "numberOfGuests" : "",
                "car" : "",
                "notes" : "",
                "hasLicense" : boat?.hasLicense,  
                "fullName": person?.name && `${person.name} ${person.lastName}` ,// dato extra                                              
                "boatType" :boat?.typeBoat_enum // dato extra,             
            })
        }
    }

    const sendForm = (data) =>{
        // TRANSFORMO INFO ANTES DE ENVIAR A BACK

       /* NECESITO RECIBIR EN BACKEND..
        "idShift" :1 ,
        "person" : "35924410",
        "numberOfGuests" : 2,
        "car" : "AE735AF",
        "notes" : "Primer registro post refactor",
        "hasLicense" : false



        "simpleBoat": {
            "typeSimpleBoat_enum" : "KITESURF",
            "details" : "Kite rojo y blanco, con numero 23",
            "notes" : "Kite en perfectas condiciones, sin casco."
        },

        "license" :{
          "licenseCode": "msjjj"
          "registeredBoat": {

          }
        }

       */
        let formData = data
        formData.person = data.person.dni //person :{dni: '35924410'}
        formData.hasLicense = data.license != null ? true : false //  hasLicense :undefined

        delete formData.fullName
        delete formData.boatType
        if(data.license){
          delete formData.license.registeredBoat
        }


        setPendingPostRequest(true)
        request(
            "POST",
            "records/",
            formData)
            .then((response) => {      
              setPendingPostRequest(false)
              if(response.status ===201){
                renderAlert("Registro creado!", "Exito", "success",4000)    
                setRecord({}) // Limpio record para que campos boat y person queden limpios
                reset()// limpiar form, campos simples
                
                // TODO aca se redirige a la pagina, pero se alcanza a ver la notificacion??? 
                // TODO aca se redirige a la pagina, pero se alcanza a ver la notificacion??? 
                // TODO aca se redirige a la pagina, pero se alcanza a ver la notificacion??? 
                // TODO aca se redirige a la pagina, pero se alcanza a ver la notificacion??? 
                
                navigate("/dashboard")
                
                // TODO aca se redirige a la pagina, pero se alcanza a ver la notificacion??? 
                // TODO aca se redirige a la pagina, pero se alcanza a ver la notificacion??? 
                // TODO aca se redirige a la pagina, pero se alcanza a ver la notificacion??? 
                // TODO aca se redirige a la pagina, pero se alcanza a ver la notificacion??? 

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

    function renderFormSimpleBoat(){
        return (
            <div className="inputContainer">
              <div className="form-floating mb-4 inputDiv">
                <input type="text" id="simpleBoat.typeSimpleBoat_enum" name="simpleBoat.typeSimpleBoat_enum" className="form-control" {...register("simpleBoat.typeSimpleBoat_enum")} disabled />
                <label className="form-label" htmlFor="simpleBoat.typeSimpleBoat_enum">Tipo embarcacion</label>
              </div>  
              <div className="form-floating mb-4 inputDiv">
                <input type="text" id="simpleBoat.details" name="simpleBoat.details" className="form-control" {...register("simpleBoat.details")} disabled />
                <label className="form-label" htmlFor="simpleBoat.details">Detalles</label>
              </div>  
              <div className="form-floating mb-4 inputDiv">
                <input type="text" id="simpleBoat.notes" name="simpleBoat.notes" className="form-control" {...register("simpleBoat.notes")} disabled />
                <label className="form-label" htmlFor="simpleBoat.notes">Notas</label>
              </div>  
            </div>   
        )
    }

    function renderFormLicencedBoat(){
        return (
            <>
            <div className="inputContainer">
              <div className="form-floating mb-4 inputDiv">
                <input type="text" id="license.licenseCode" name="license.licenseCode" className="form-control" {...register("license.licenseCode")} disabled />
                <label className="form-label" htmlFor="license.licenseCode">Matricula</label>
              </div>
              <div className="form-floating mb-4 inputDiv">
                <input type="text" id="license.registeredBoat.name" name="license.registeredBoat.name" className="form-control" {...register("license.registeredBoat.name")} disabled />
                <label className="form-label" htmlFor="license.registeredBoat.name">Nombre embarcacion</label>
              </div>  
              <div className="form-floating mb-4 inputDiv">
                <input type="text" id="boatType" name="boatType" className="form-control" {...register("boatType")} disabled />
                <label className="form-label" htmlFor="boatType">Tipo embarcacion</label>
                {errors.boatType?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
              </div>  
            </div>                  
            </>
        )
    }

    function renderFormAddNewRecord(){
        return (
            <form onSubmit={handleSubmit(sendForm)} >  
                  <div className="boatContainer">
                    <h5>Embarcacion</h5>    
                    <span className="btnModalBoat">  
                        <BoatFormModal boatSelected={(record?.license || record?.simpleBoat) && true } renderAlert={renderAlert}/> 
                    </span>                       
                    {record?.license && renderFormLicencedBoat ()}
                    {record?.simpleBoat &&  renderFormSimpleBoat()}
                  </div>

                  <div className="personContainer">
                    <h5>Timonel</h5>
                    <span className="btnModalPerson">
                        <PersonFormModal personSelected={record?.person} renderAlert={renderAlert}/>
                    </span>
                    
                    {record?.person && (
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
                    )}
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
                 
                  <button type="submit" className="btn btn-success btn-lg btn-block mb-3">Agregar registro</button>
            </form>
        )
    }

    return (
        <>
        {showAlert && ( <CustomAlert alertConfig={alert} /> )}
        <div className="alert alert-secondary addRecordForm">
            <h4>Agregar nuevo registro </h4> 
            { pendingPostRequest ? renderPendingPostRequest() : renderFormAddNewRecord() }            
        </div>
        <Link to="/dashboard" className="btn btn-secondary btn-lg" role="button">Volver</Link>
        </>

    )
}