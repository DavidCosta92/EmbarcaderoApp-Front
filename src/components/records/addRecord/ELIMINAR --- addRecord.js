// @ts-nocheck
import "./addRecord.css"
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/authContext.js";
import { request } from "../../utils/axios_helper.js";
import { useForm } from 'react-hook-form';
import CustomAlert from "../../alert/customAlert.js";
import PersonModal from "../../modals/persons/personModal.js";
import BoatModal from "../../modals/boat/boatModal.js";


export default function AddRecord(){
    const {renderPendingPostRequest, getShiftUser, shift} = useContext(AuthContext)
    const {register, formState:{errors}, handleSubmit, watch, reset } = useForm()   

    const [ pendingPostRequest , setPendingPostRequest ] = useState (false)
    const [ showAlert, setShowAlert] = useState(false)
    const [ alert, setAlert] = useState()
    const [ updatedForm, setUpdatedForm] = useState()
    const [ formData, setFormData ] = useState({})

    const [ boat, setBoat ] = useState()
    const [ person, setPerson ] = useState()
    
    useEffect(()=>{
      getShiftUser()
    }, [])

    useEffect(()=>{      
      reset({
        "idShift" : shift?.id ,
        "boat" :  boat && ( boat?.boatNotes && `Supuest nombre de ${boat.boatNotes}`),                                        
        "person": person?.dni,
        "numberOfGuests" : "",
        "car" : "",
        "notes" : "",
        "hasLicense" : "",
        "license" :  boat && (boat?.license ? "Tiene licencia.." : " No tiene licencia.."),  
        "fullName": person?.name && `Supuest fullname de ${person.name}` ,// dato extra                                              
        "boatType" :boat?.typeBoat_enum // dato extra,             
    })
    setUpdatedForm(false)
  }, [updatedForm])

    /*

    **********************************************************************************************************
    TODO

    DISEÑAR LOGICA PARA EMBARCACIONES CON O SIN MATRICULAS, 
    SEGUN ESO MODIFICAR BACK PARA QUE MANEJE 
    EMB CON MATRICULA Y MOTOR
    EMB CON MATRICULA Y SIN MOTOR
    EMB SIN MATRICULA

    Y AL ULTIMO EDITAR MODAL DE EMB PARA QUE FUNCIONE DE ACUERDO A ESO...

    **********************************************************************************************************
  */


    // cuando tengo todo, reseteo datos por defecto formulario
    useEffect(() => {
      reset({
        "idShift" : shift?.id ,
        "boat" :  boat && ( boat?.boatNotes && `Supuest nombre de ${boat.boatNotes}`),     
        "person": person?.dni,
        "numberOfGuests" : "",
        "car" : "",
        "notes" : "",
        "hasLicense" : "",
        "license" :  boat && (boat?.license ? "Tiene licencia.." : " No tiene licencia.."),                                         
        "fullName": person?.name && `Supuest fullname de ${person.name}` ,// dato extra                                              
        "boatType" :boat?.typeBoat_enum // dato extra,                 
      })
      setUpdatedForm(false)
        
    }, [updatedForm]);
    
    function renderAlert(msg, title, style, miliseg){
      setShowAlert(true)
      setAlert({msg:msg, title: title, style: style})
      setTimeout(() => {
          setShowAlert(false);
      }, miliseg);
    }

    const sendForm = (data) =>{
      // TRANSFORMO INFO ANTES DE ENVIAR A BACK
      formData.idShift = shift?.id
      formData.boat = boat?.name == undefined && "duppper" // HARDCODDEADO PARA QUE NO FALLE BACK... LUEGO MODIFICAR PARA QUE SEA REAL..
      formData.person = person?.dni
      formData.numberOfGuests = data.numberOfGuests
      formData.car = data.car.toUpperCase()
      formData.notes = data.notes
      formData.hasLicense = true // boat?.hasLicense VA TRUE PARA QUE NO FALLE BACK... LUEGO MODIFICAR PARA QUE SEA REAL..
      
      setPendingPostRequest(true)
      request(
          "POST",
          "records/",
          formData)
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
                    <span className="btnModalBoat">                      
                      <BoatModal boat={boat} setBoat={setBoat} setFormData={setFormData} setUpdatedForm={setUpdatedForm} formData={formData} renderAlert={renderAlert}/>                    
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
                        <input type="number" id="person" name="person" className="form-control"  {...register("person")} disabled />
                        <label className="form-label" htmlFor="person">Dni</label>
                        {errors.person?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                      </div>
                      <div className="form-floating mb-4 inputDiv">
                        <input type="text" id="fullName" name="fullName" className="form-control"  {...register("fullName")} disabled  />
                        <label className="form-label" htmlFor="fullName">Nombre y apellido</label>
                      </div>   
                    </div>                 
                    <span className="btnModalPerson">
                      <PersonModal  person={person} setPerson={setPerson} setFormData={setFormData} setUpdatedForm={setUpdatedForm} formData={formData} renderAlert={renderAlert} />
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
                 
                  <button type="submit" className="btn btn-success btn-lg btn-block mb-3" onClick={()=> console.log("hice click en btn agregar registro")}>Agregar registro</button>
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