// @ts-nocheck
import "./shift.css"
import RecordsContainer from "../../records/recordsContainer/recordsContainer.js"
import StaffContainer from "../../staff/staffContainer/staffContainer.js"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/authContext.js";
import { useForm } from "react-hook-form";
import { request } from "../../utils/axios_helper.js";
import { AlertContext } from "../../utils/alertContex.js";

export default function Shift (){    
    const { alert, renderAlert, displayAlert } = useContext(AlertContext)
    const { loguedUser,renderPendingPostRequest, getShiftUser, renderSpiner, shift, setShift, loadingShift, setLoadingShift, shiftHasUpdates} = useContext(AuthContext)

    const { register, formState:{errors, isDirty}, handleSubmit, watch , control, reset} = useForm()
    const [ sendingPostRequest , setSendingPostRequest] = useState(false)
    
    /*
    useEffect(()=>{
        getShiftUser()
    }, [])
    */
        
    useEffect(()=>{
        getShiftUser()        
    }, [shiftHasUpdates])

    function renderShift (){
        if(shift !== null ){
            const fecha = new Date(shift?.date)
            return(
                <div className="actualShift">
                    <div className="header">
                        <h5 className="">Datos de la guardia {shift.dam}</h5>      
                        <div>
                            <span>
                                <ul>
                                    <li> ID: {shift.id}</li>
                                    <li> Fecha: {fecha.toLocaleDateString()}</li>
                                    <li> Estado: {shift.close === null && "Activo"}</li>
                                </ul>    
                            </span>     
                        </div>
                        <span className="notes">                            
                            <p> Notas: {shift.notes}</p>
                        </span>                                       
                    </div>          
                    <RecordsContainer records={shift.records}/>
                    <StaffContainer/>
                    
                    {shift.close === null && (
                        <div className="buttons">
                            <a href="#" className="btn btn-warning btn-lg" tabIndex="-1" role="button" aria-disabled="true">Btn EDITAR guardia, lleva a pantalla para editar.. </a> 
                                                   
                            <a href="#" className="btn btn-danger btn-lg" tabIndex="-1" role="button" aria-disabled="true">Btn cerrar guardia, previo modal para confirmar (pendiente) </a> 
                        </div>
                    )}
                    
                </div>
            )
        } else{
            return(
                <div className="actualShift">
                    <div className="header">
                        <h5 className="">No hay guardia cargada para el usuario</h5>                 
                    </div>      
                    {renderFormCreateShift()}
                </div>
            )
        }
    }
    function sendForm(data){
        data.staff=[loguedUser.dni]
        createShift(data)
    }
    function createShift(data){
        setSendingPostRequest(true)
        request(
            "POST",
            `/shifts/`,
            data )
            .then((response) => {                  
                setSendingPostRequest(false)
                if(response.status == 201){       
                    setShift(response.data)
                    renderAlert("Guardia creada!", "Exito", "success",4000)   
                }
            })
            .catch((error) => {   
                setShift(null)
                renderAlert(error.response?.data?.message, "Error", "warning",5000)
                setSendingPostRequest(false)
            }
        )   
    }
    function renderFormCreateShift(){
        return(
            <form onSubmit={handleSubmit(sendForm)} >  
                <h6>¿Quieres crear una nueva guardia? </h6>
                <div className="form-outline mb-4 inputDiv">
                    <label  htmlFor="dam">Elije el dique</label>
                    <select id="dam" name="dam" className="form-select" {...register("dam")}>
                        <option value="DIQUE_ULLUM">Ullum</option>
                        <option value="DIQUE_PUNTA_NEGRA">Punta negra </option>
                        <option value="DIQUE_CUESTA_DEL_VIENTO">Cuesta del viento</option>    
                    </select>
                </div>            
                <div className="form-outline mb-4 inputDiv">
                    <label className="form-label" htmlFor="notes">Notas</label>
                    <input type="text" id="notes" name="notes" className="form-control" {...register("notes")} />
                    {errors.notes?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                </div>                         
                <button type="submit" className="btn btn-success btn-lg btn-block mb-3">Crear guardia!</button>
            </form>           
        )
    }
    return (      
        <>                
        { alert && displayAlert(alert)}
        { sendingPostRequest && renderPendingPostRequest()}
        { loadingShift?  renderSpiner() : renderShift()}
        </>
    )
}

