// @ts-nocheck
import "./addRecord.css"
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/authContext";
import { postNewRecordRequest } from "../../utils/axios_helper.js";

export default function AddRecord(){
    const {shiftId, renderPendingPostRequest } = useContext(AuthContext)

    const [ pendingPostRequest , setPendingPostRequest ] = useState (false)
    
    let newRecord = {
        "idShift" :shiftId,
        "boat" : "",
        "person" : "",
        "numberOfGuests" : "",
        "car" : "",
        "notes" : "",
        "hasLicense" : ""
    }
    const [ record , setRecord ] = useState(newRecord)
    
   const onChangeHandler = (event) => {
    if (event.target.name === "hasLicense") {
        newRecord["hasLicense"] = event.target.value === "on" ? true : false
    } else {
        newRecord[event.target.name] = event.target.value
    }
    setRecord(newRecord)
   }

   const onSubmitRegister = (event) =>{
    event.preventDefault()
    setPendingPostRequest(true)
    postNewRecord()
   }
   function postNewRecord (){
      const record = postNewRecordRequest (record)

      if (record !== null ){
        setPendingPostRequest(false)
        // terminar de desarrollar, falta notificacion
        // terminar de desarrollar, falta notificacion
        // terminar de desarrollar, falta notificacion
      } else{
        setPendingPostRequest(false)
      }
  }

    function renderFormAddNewRecord(){
        return (
            <>
            <form onSubmit={onSubmitRegister}> 
                  <div className="form-outline mb-4">
                    <input type="text" id="boat" name="boat" className="form-control" onChange={onChangeHandler}/>
                    <label className="form-label" htmlFor="boat">Nombre embarcacion</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="number" id="person" name="person" className="form-control" onChange={onChangeHandler}/>
                    <label className="form-label" htmlFor="person">Dni persona a cargo</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="number" id="numberOfGuests" name="numberOfGuests" className="form-control" onChange={onChangeHandler}/>
                    <label className="form-label" htmlFor="numberOfGuests">Cantidad invitados</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="text" id="car" name="car" className="form-control" onChange={onChangeHandler}/>
                    <label className="form-label" htmlFor="car">Patente auto</label>
                  </div>
                  <div className="form-outline mb-4">
                    <textarea type="text" id="notes" name="notes" className="form-control" onChange={onChangeHandler}/>
                    <label className="form-label" htmlFor="notes">Notas</label>
                  </div>
                  <div className="form-check form-switch mb-4">
                    <input type="checkbox" id="hasLicense" name="hasLicense" className="form-check-input" onChange={onChangeHandler}/>
                    <label className="form-check-label" htmlFor="hasLicense">Posee matricula</label>
                  </div>
                 
                  <button type="submit" className="btn btn-success btn-lg btn-block mb-3">Agregar registro</button>
            </form>
            <Link to="/dashboard" className="btn btn-secondary btn-lg" role="button">Volver</Link>
            </>
        )
    }

    

    return (
        <div className="alert alert-secondary addRecordForm">
            <h4>Agregar nuevo registro </h4> 
            {pendingPostRequest? renderPendingPostRequest() : renderFormAddNewRecord()}            
        </div>

    )
}