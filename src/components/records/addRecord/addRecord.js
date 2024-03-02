// @ts-nocheck
import "./addRecord.css"
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/authContext";
import { request } from "../../utils/axios_helper.js";
import { useForm } from 'react-hook-form';
import CustomAlert from "../../alert/customAlert.js";
import PersonModal from "../../modals/persons/personModal.js";
import BoatModal from "../../modals/boat/boatModal.js";


export default function AddRecord(){
    const {renderPendingPostRequest, getShiftUser, shift /*, personSelected */} = useContext(AuthContext)
    const {register, formState:{errors}, handleSubmit, watch, reset } = useForm()    
    const [ pendingPostRequest , setPendingPostRequest ] = useState (false)
    const [ showAlert, setShowAlert] = useState(false)
    const [ alert, setAlert] = useState()
    const [ personSelected , setPersonSelected]  = useState()
    const [ boatSelected , setBoatSelected]  = useState()
    
    useEffect(()=>{
      getShiftUser()
    }, [])

    // cuando tengo todo, reseteo datos por defecto formulario
    useEffect(() => {
      console.log("refrescando pantalla al guardar persona? "+personSelected?.dni)
      if (personSelected) {
          reset({
            "person": personSelected.dni ,
            "fullName": `${personSelected.name} ${personSelected.lastName}` ,
            //  "id": personSelected.id ,
            //  "phone": personSelected.phone ,
            //  "name": personSelected.name ,
            //  "lastName": personSelected.lastName ,
            //  "emergency_phone": personSelected.emergency_phone ,
            //  "address": personSelected.address ,
            //  "notes": personSelected.notes ,
          });
      }        
    }, [personSelected]);
    
    function renderAlert(msg, title, style, miliseg){
      setShowAlert(true)
      setAlert({msg:msg, title: title, style: style})
      setTimeout(() => {
          setShowAlert(false);
      }, miliseg);
    }
    const sendForm = (data) =>{
      data.idShift = shift.id
      data.car = data.car.toUpperCase()
      setPendingPostRequest(true)
      request(
          "POST",
          "records/",
          data)
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
                        <input type="text" id="license" name="license" className="form-control" {...register("license", {required:true, maxLength:20 })} disabled />
                        <label className="form-label" htmlFor="license">Matricula</label>
                      </div>
                      <div className="form-floating mb-4 inputDiv">
                        <input type="text" id="boat" name="boat" className="form-control" {...register("boat", {required:true, maxLength:20 })} disabled />
                        <label className="form-label" htmlFor="boat">Nombre embarcacion</label>
                      </div>  
                      <div className="form-floating mb-4 inputDiv">
                        <input type="text" id="boatType" name="boatType" className="form-control" {...register("boatType", {required:true, maxLength:20 })} disabled />
                        <label className="form-label" htmlFor="boatType">Tipo embarcacion</label>
                      </div>  
                    </div>                 
                    <span className="btnModalBoat">
                      <BoatModal setBoatSelected={setBoatSelected} renderAlert={renderAlert} boatSelected={boatSelected} />
                    </span>
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
                        <input type="number" id="person" name="person" className="form-control"  {...register("person", {required:true, maxLength:9 })} disabled />
                        <label className="form-label" htmlFor="person">Dni</label>
                        {errors.person?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        {errors.person?.type === "maxLength" && <p className="inputFormError">Largo maximo de 9 caracteres</p>}
                      </div>
                      <div className="form-floating mb-4 inputDiv">
                        <input type="text" id="fullName" name="fullName" className="form-control"  {...register("fullName")} disabled  />
                        <label className="form-label" htmlFor="fullName">Nombre y apellido</label>
                      </div>   
                    </div>                 
                    <span className="btnModalPerson">
                      <PersonModal setPersonSelected={setPersonSelected} renderAlert={renderAlert} personSelected={personSelected} />
                    </span>
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